/* ==========================================================================
   Entrelinhas — checkout (checkout.html) e acompanhamento do pedido (pedido.html)

   O pagamento é SIMULADO: o site não tem backend nem gateway de pagamento.
   Os dados do cartão são apenas validados no navegador e descartados; do
   cartão guardamos só a bandeira e os 4 últimos dígitos. Os códigos de Pix e
   de boleto são de demonstração e não funcionam em apps de banco.
   ========================================================================== */

const CHAVE_PEDIDOS = 'entrelinhas:pedidos';

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const somenteDigitos = (valor) => String(valor).replace(/\D/g, '');
const arredondar = (valor) => Math.round(valor * 100) / 100;
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

/* --------------------------------------------------------------------------
   Máscaras dos campos
   -------------------------------------------------------------------------- */

const MASCARAS = {
  cpf: (v) => somenteDigitos(v).slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),

  telefone: (v) => {
    const d = somenteDigitos(v).slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  },

  cep: (v) => somenteDigitos(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),

  cartaoNumero: (v) => {
    const d = somenteDigitos(v);
    if (/^3[47]/.test(d)) {
      // Amex: 4-6-5
      const a = d.slice(0, 15);
      return [a.slice(0, 4), a.slice(4, 10), a.slice(10)].filter(Boolean).join(' ');
    }
    return d.slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');
  },

  cartaoValidade: (v) => somenteDigitos(v).slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2'),
  cartaoCvv: (v) => somenteDigitos(v).slice(0, 4),
};

/* --------------------------------------------------------------------------
   Validações
   -------------------------------------------------------------------------- */

function cpfValido(cpf) {
  const d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const digito = (n) => {
    let soma = 0;
    for (let i = 0; i < n; i++) soma += Number(d[i]) * (n + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

// Algoritmo de Luhn: confere se o número do cartão é bem formado
function luhnValido(numero) {
  const d = somenteDigitos(numero);
  if (d.length < 13 || d.length > 19) return false;
  let soma = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    soma += n;
  }
  return soma % 10 === 0;
}

const BANDEIRAS = [
  ['Elo', /^(4011(78|79)|43(1274|8935)|45(1416|7393|763[12])|50(4175|6699|67[0-7]\d|9\d{3})|627780|63(6297|6368)|650\d|6516|6550)/],
  ['Hipercard', /^(606282|3841)/],
  ['Amex', /^3[47]/],
  ['Mastercard', /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/],
  ['Visa', /^4/],
];

function detectarBandeira(numero) {
  const d = somenteDigitos(numero);
  return BANDEIRAS.find(([, regra]) => regra.test(d))?.[0] ?? '';
}

function erroValidade(valor) {
  const [mes, ano] = valor.split('/').map(Number);
  if (!mes || ano === undefined || valor.length !== 5 || mes > 12) return 'Use o formato MM/AA.';
  const fimDoMes = new Date(2000 + ano, mes, 0, 23, 59, 59);
  return fimDoMes < new Date() ? 'Este cartão está vencido.' : '';
}

const obrigatorio = (mensagem) => (v) => (v.trim() ? '' : mensagem);

const REGRAS = {
  nome: (v) => (v.trim().split(/\s+/).length >= 2 ? '' : 'Informe nome e sobrenome.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido.'),
  telefone: (v) => (somenteDigitos(v).length >= 10 ? '' : 'Informe o celular com DDD.'),
  cpf: (v) => (cpfValido(v) ? '' : 'CPF inválido.'),
  cep: (v) => (somenteDigitos(v).length === 8 ? '' : 'Informe um CEP com 8 dígitos.'),
  rua: obrigatorio('Informe a rua.'),
  numero: obrigatorio('Informe o número (ou "s/n").'),
  bairro: obrigatorio('Informe o bairro.'),
  cidade: obrigatorio('Informe a cidade.'),
  uf: obrigatorio('Selecione o estado.'),
  cartaoNumero: (v) => (luhnValido(v) ? '' : 'Número de cartão inválido.'),
  cartaoNome: (v) => (v.trim().length >= 3 ? '' : 'Informe o nome como está no cartão.'),
  cartaoValidade: erroValidade,
  cartaoCvv: (v, form) => {
    const tamanho = detectarBandeira(form.elements.cartaoNumero.value) === 'Amex' ? 4 : 3;
    return somenteDigitos(v).length === tamanho ? '' : `O CVV tem ${tamanho} dígitos.`;
  },
};

const CAMPOS_CARTAO = ['cartaoNumero', 'cartaoNome', 'cartaoValidade', 'cartaoCvv'];

function mostrarErro(form, nome, mensagem) {
  const campo = form.elements[nome];
  const aviso = form.querySelector(`[data-erro="${nome}"]`);
  if (!campo || !aviso) return;
  aviso.id = `erro-${nome}`;
  aviso.textContent = mensagem;
  aviso.hidden = !mensagem;
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
  if (mensagem) campo.setAttribute('aria-describedby', aviso.id);
  else campo.removeAttribute('aria-describedby');
}

/* --------------------------------------------------------------------------
   Totais, frete e parcelas
   -------------------------------------------------------------------------- */

function valorFrete(opcao, subtotal) {
  return opcao.gratisAcimaDoLimite && subtotal >= LOJA.freteGratisAcima ? 0 : opcao.preco;
}

function calcularTotais(itens, freteId, metodo) {
  const subtotal = arredondar(Carrinho.total(itens));
  const opcao = LOJA.fretes.find((f) => f.id === freteId) ?? LOJA.fretes[0];
  const frete = valorFrete(opcao, subtotal);
  const desconto = metodo === 'pix' ? arredondar(subtotal * LOJA.descontoPix) : 0;
  return { subtotal, opcao, frete, desconto, total: arredondar(subtotal + frete - desconto) };
}

function maximoParcelas(total) {
  return Math.max(1, Math.min(LOJA.parcelasSemJuros, Math.floor(total / LOJA.parcelaMinima)));
}

/* --------------------------------------------------------------------------
   Pedidos salvos no navegador
   -------------------------------------------------------------------------- */

function lerPedidos() {
  try {
    const pedidos = JSON.parse(localStorage.getItem(CHAVE_PEDIDOS)) ?? [];
    return Array.isArray(pedidos) ? pedidos : [];
  } catch {
    return [];
  }
}

function salvarPedidos(pedidos) {
  try {
    localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos.slice(-20)));
  } catch {
    // sem localStorage: o pedido não fica salvo
  }
}

function buscarPedido(numero) {
  return lerPedidos().find((p) => p.numero === numero);
}

function atualizarPedido(numero, mudancas) {
  const pedidos = lerPedidos().map((p) => (p.numero === numero ? { ...p, ...mudancas } : p));
  salvarPedidos(pedidos);
  return pedidos.find((p) => p.numero === numero);
}

function gerarNumeroPedido() {
  return `ENT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

// Gerador pseudoaleatório com semente (mesma entrada, mesmo resultado)
function geradorDigitos(texto) {
  let semente = [...texto].reduce((s, c) => (s * 31 + c.charCodeAt(0)) % 2147483646, 7) + 1;
  return () => {
    semente = (semente * 48271) % 2147483647;
    return semente;
  };
}

// Código "copia e cola" de DEMONSTRAÇÃO: chave e checksum inválidos de propósito
function codigoPixDemo(numero, total) {
  const valor = total.toFixed(2);
  return `00020126580014BR.GOV.BCB.PIX0136DEMONSTRACAO-ENTRELINHAS-${numero}5204000053039865406${valor}5802BR5911ENTRELINHAS6009SAO PAULO6304DEMO`;
}

// Linha digitável de DEMONSTRAÇÃO (banco 999 não existe)
function linhaDigitavelDemo(numero, total) {
  const proximo = geradorDigitos(numero);
  const digitos = (n) => Array.from({ length: n }, () => proximo() % 10).join('');
  const valor = String(Math.round(total * 100)).padStart(10, '0');
  return `99990.${digitos(5)} ${digitos(5)}.${digitos(6)} ${digitos(5)}.${digitos(6)} ${digitos(1)} ${digitos(4)}${valor}`;
}

function criarPedido(form, itens, totais) {
  const dados = Object.fromEntries(new FormData(form));
  const numero = gerarNumeroPedido();
  const agora = new Date();

  let pagamento;
  if (dados.metodo === 'cartao') {
    pagamento = {
      metodo: 'cartao',
      bandeira: detectarBandeira(dados.cartaoNumero) || 'Cartão',
      final: somenteDigitos(dados.cartaoNumero).slice(-4),
      parcelas: Number(dados.parcelas) || 1,
    };
  } else if (dados.metodo === 'pix') {
    pagamento = {
      metodo: 'pix',
      codigo: codigoPixDemo(numero, totais.total),
      expiraEm: new Date(agora.getTime() + LOJA.validadePixMinutos * 60000).toISOString(),
    };
  } else {
    const vencimento = new Date(agora);
    vencimento.setDate(vencimento.getDate() + LOJA.validadeBoletoDias);
    pagamento = {
      metodo: 'boleto',
      linhaDigitavel: linhaDigitavelDemo(numero, totais.total),
      vencimento: vencimento.toISOString(),
    };
  }

  return {
    numero,
    criadoEm: agora.toISOString(),
    status: dados.metodo === 'cartao' ? 'pago' : 'aguardando',
    itens: itens.map(({ produto, tamanho, cor, quantidade }) => ({
      id: produto.id, nome: produto.nome, tamanho, cor, corNome: corProduto(produto, cor).nome, quantidade, preco: produto.preco,
    })),
    subtotal: totais.subtotal,
    frete: { nome: totais.opcao.nome, prazo: totais.opcao.prazo, valor: totais.frete },
    desconto: totais.desconto,
    total: totais.total,
    cliente: {
      nome: dados.nome.trim(),
      email: dados.email.trim(),
      telefone: dados.telefone,
      cpf: `***.${dados.cpf.slice(4, 11)}-**`,
    },
    endereco: {
      cep: dados.cep, rua: dados.rua.trim(), numero: dados.numero.trim(), complemento: dados.complemento.trim(),
      bairro: dados.bairro.trim(), cidade: dados.cidade.trim(), uf: dados.uf,
    },
    pagamento,
  };
}

/* --------------------------------------------------------------------------
   Página de checkout
   -------------------------------------------------------------------------- */

function iniciarCheckout() {
  const form = document.getElementById('form-checkout');
  if (!form) return;

  const vazio = document.getElementById('checkout-vazio');
  const opcoesFrete = document.getElementById('opcoes-frete');
  const resumoItens = document.getElementById('resumo-itens');
  const resumoTotais = document.getElementById('resumo-totais');
  const selectParcelas = form.elements.parcelas;
  const botao = document.getElementById('botao-finalizar');
  const erroGeral = document.getElementById('erro-geral');
  let finalizando = false;

  form.elements.uf.insertAdjacentHTML('beforeend', UFS.map((uf) => `<option>${uf}</option>`).join(''));
  document.getElementById('pix-percentual').textContent = `${LOJA.descontoPix * 100}%`;
  document.getElementById('pix-validade').textContent = LOJA.validadePixMinutos;
  document.getElementById('boleto-validade').textContent = LOJA.validadeBoletoDias;

  const metodoAtual = () => form.querySelector('[name="metodo"]:checked').value;
  const freteAtual = () => form.querySelector('[name="frete"]:checked')?.value ?? LOJA.fretes[0].id;

  function renderFrete(subtotal) {
    const selecionado = freteAtual();
    opcoesFrete.innerHTML = LOJA.fretes.map((f) => {
      const valor = valorFrete(f, subtotal);
      return `
        <label class="flex cursor-pointer items-center gap-4 border border-linha p-4 transition hover:border-tinta has-[:checked]:border-tinta has-[:checked]:bg-papel-escuro/60">
          <input type="radio" name="frete" value="${f.id}" class="h-4 w-4 accent-[#8F1D2C]" ${f.id === selecionado ? 'checked' : ''}>
          <span class="flex-1">
            <span class="block font-medium">${f.nome}</span>
            <span class="text-sm text-grafite">${f.prazo}</span>
          </span>
          <span class="font-medium ${valor === 0 ? 'text-vinho' : ''}">${valor === 0 ? 'Grátis' : formatarPreco(valor)}</span>
        </label>`;
    }).join('');
  }

  function renderParcelas(total) {
    const anterior = Number(selectParcelas.value) || 1;
    const maximo = maximoParcelas(total);
    selectParcelas.innerHTML = Array.from({ length: maximo }, (_, i) => {
      const n = i + 1;
      return `<option value="${n}">${n}x de ${formatarPreco(total / n)} sem juros${n === 1 ? ' (à vista)' : ''}</option>`;
    }).join('');
    selectParcelas.value = String(Math.min(anterior, maximo));
  }

  function render() {
    if (finalizando) return;
    const itens = Carrinho.itens();

    vazio.hidden = itens.length > 0;
    form.hidden = itens.length === 0;
    if (!itens.length) return;

    const metodo = metodoAtual();
    const subtotal = Carrinho.total(itens);
    renderFrete(subtotal);
    const totais = calcularTotais(itens, freteAtual(), metodo);
    renderParcelas(totais.total);

    document.getElementById('painel-cartao').hidden = metodo !== 'cartao';
    document.getElementById('painel-pix').hidden = metodo !== 'pix';
    document.getElementById('painel-boleto').hidden = metodo !== 'boleto';

    resumoItens.innerHTML = itens.map(({ produto, tamanho, cor, quantidade }) => `
      <li class="flex items-center gap-3 py-3">
        <span class="block h-16 w-14 shrink-0 overflow-hidden bg-papel-escuro">${fotoProduto(produto, cor, { rotulo: false })}</span>
        <span class="min-w-0 flex-1">
          <span class="block truncate font-serif">${escaparHTML(produto.nome)}</span>
          <span class="text-xs text-grafite">${corProduto(produto, cor).nome} · Tam. ${escaparHTML(tamanho)} · ${quantidade}x</span>
        </span>
        <span class="text-sm">${formatarPreco(produto.preco * quantidade)}</span>
      </li>`).join('');

    const parcelas = Number(selectParcelas.value) || 1;
    const detalhePagamento = {
      cartao: parcelas > 1 ? `em ${parcelas}x de ${formatarPreco(totais.total / parcelas)} sem juros` : 'à vista no cartão',
      pix: 'à vista no Pix',
      boleto: 'à vista no boleto',
    }[metodo];

    resumoTotais.innerHTML = `
      <div class="flex justify-between"><dt class="text-grafite">Subtotal</dt><dd>${formatarPreco(totais.subtotal)}</dd></div>
      <div class="flex justify-between"><dt class="text-grafite">Frete (${totais.opcao.nome})</dt><dd>${totais.frete === 0 ? '<span class="text-vinho">Grátis</span>' : formatarPreco(totais.frete)}</dd></div>
      ${totais.desconto ? `<div class="flex justify-between text-vinho"><dt>Desconto Pix (${LOJA.descontoPix * 100}%)</dt><dd>− ${formatarPreco(totais.desconto)}</dd></div>` : ''}
      <div class="flex items-baseline justify-between border-t border-linha pt-3">
        <dt class="text-sm uppercase tracking-widest">Total</dt>
        <dd class="text-right"><span class="block font-serif text-3xl">${formatarPreco(totais.total)}</span><span class="text-xs text-grafite">${detalhePagamento}</span></dd>
      </div>`;
  }

  // Máscaras e validação enquanto digita
  form.addEventListener('input', (e) => {
    const { name } = e.target;
    if (MASCARAS[name]) e.target.value = MASCARAS[name](e.target.value);
    if (name === 'cartaoNumero') document.getElementById('bandeira').textContent = detectarBandeira(e.target.value);
    if (name === 'cep' && somenteDigitos(e.target.value).length === 8) buscarCep(e.target.value);
    if (e.target.getAttribute('aria-invalid') === 'true' && REGRAS[name]) {
      mostrarErro(form, name, REGRAS[name](e.target.value, form));
      if (!form.querySelector('[aria-invalid="true"]')) erroGeral.hidden = true;
    }
  });

  form.addEventListener('focusout', (e) => {
    const { name, value } = e.target;
    if (REGRAS[name] && value) mostrarErro(form, name, REGRAS[name](value, form));
  });

  form.addEventListener('change', (e) => {
    if (['metodo', 'frete', 'parcelas'].includes(e.target.name)) render();
  });

  // Busca de endereço pelo CEP (ViaCEP, API pública e gratuita)
  let ultimoCep = '';
  async function buscarCep(cep) {
    const digitos = somenteDigitos(cep);
    if (digitos === ultimoCep) return;
    ultimoCep = digitos;
    const status = document.getElementById('cep-status');
    status.textContent = 'Buscando endereço…';
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
      const dados = await resposta.json();
      if (dados.erro) throw new Error('CEP não encontrado');
      form.elements.rua.value = dados.logradouro ?? '';
      form.elements.bairro.value = dados.bairro ?? '';
      form.elements.cidade.value = dados.localidade ?? '';
      form.elements.uf.value = dados.uf ?? '';
      ['rua', 'bairro', 'cidade', 'uf'].forEach((campo) => form.elements[campo].value && mostrarErro(form, campo, ''));
      status.textContent = '';
      form.elements.numero.focus();
    } catch {
      status.textContent = 'Não encontramos esse CEP. Preencha o endereço manualmente.';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (finalizando) return;

    const metodo = metodoAtual();
    let primeiroInvalido = null;

    Object.keys(REGRAS).forEach((nome) => {
      const ignorar = metodo !== 'cartao' && CAMPOS_CARTAO.includes(nome);
      const mensagem = ignorar ? '' : REGRAS[nome](form.elements[nome].value, form);
      mostrarErro(form, nome, mensagem);
      if (mensagem && !primeiroInvalido) primeiroInvalido = form.elements[nome];
    });

    erroGeral.hidden = !primeiroInvalido;
    if (primeiroInvalido) {
      primeiroInvalido.focus();
      return;
    }

    const itens = Carrinho.itens();
    if (!itens.length) return render();
    const totais = calcularTotais(itens, freteAtual(), metodo);

    finalizando = true;
    botao.disabled = true;
    botao.innerHTML = `<span class="girando" aria-hidden="true"></span> ${metodo === 'cartao' ? 'Processando pagamento…' : 'Gerando pagamento…'}`;

    await esperar(1600); // simula a comunicação com a operadora

    const pedido = criarPedido(form, itens, totais);
    salvarPedidos([...lerPedidos(), pedido]);
    Carrinho.limpar();
    location.href = `pedido.html?numero=${encodeURIComponent(pedido.numero)}`;
  });

  document.addEventListener('carrinho:atualizado', render);
  render();
}

/* --------------------------------------------------------------------------
   Página do pedido
   -------------------------------------------------------------------------- */

const formatarData = (iso, opcoes = { dateStyle: 'long' }) => new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(iso));

// QR Code ilustrativo (não escaneável como Pix): só para compor a tela de demonstração
function qrDemonstracao(texto) {
  const n = 29;
  const proximo = geradorDigitos(texto);
  const cantos = [[0, 0], [n - 7, 0], [0, n - 7]];

  function modulo(x, y) {
    for (const [ox, oy] of cantos) {
      const dx = x - ox;
      const dy = y - oy;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
      }
      if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) return false;
    }
    return proximo() % 2 === 0;
  }

  let caminho = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modulo(x, y)) caminho += `M${x + 4} ${y + 4}h1v1h-1z`;
    }
  }
  return `<svg viewBox="0 0 ${n + 8} ${n + 8}" class="h-full w-full" role="img" aria-label="QR Code Pix de demonstração" shape-rendering="crispEdges">
    <rect width="${n + 8}" height="${n + 8}" fill="#fff"/><path d="${caminho}" fill="#171717"/></svg>`;
}

function codigoDeBarras(linha) {
  const digitos = somenteDigitos(linha);
  let x = 0;
  let barras = '';
  [...digitos].forEach((d, i) => {
    const largura = Number(d) % 3 === 0 ? 3 : 1.4;
    if (i % 2 === 0) barras += `<rect x="${x.toFixed(1)}" y="0" width="${largura}" height="60"/>`;
    x += largura + 1.2;
  });
  return `<svg viewBox="0 0 ${x.toFixed(1)} 60" preserveAspectRatio="none" class="h-16 w-full" aria-hidden="true" fill="#171717">${barras}</svg>`;
}

async function copiarTexto(texto, botao) {
  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    const area = document.createElement('textarea');
    area.value = texto;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  const original = botao.textContent;
  botao.textContent = 'Copiado!';
  setTimeout(() => (botao.textContent = original), 2000);
}

function iniciarPedido() {
  const alvo = document.getElementById('pedido');
  if (!alvo) return;

  const numero = new URLSearchParams(location.search).get('numero');
  let pedido = buscarPedido(numero);
  let relogio = null;

  if (!pedido) {
    alvo.innerHTML = `
      <div class="py-20 text-center">
        <p class="font-serif text-3xl">Pedido não encontrado.</p>
        <p class="mt-3 text-grafite">Os pedidos ficam salvos apenas neste navegador.</p>
        <a href="produtos.html" class="mt-8 inline-block bg-tinta px-8 py-4 text-sm font-semibold uppercase tracking-widest text-papel hover:bg-vinho">Ver a estante</a>
      </div>`;
    return;
  }

  function blocoPagamento() {
    const pg = pedido.pagamento;

    if (pedido.status === 'pago') {
      const como = {
        cartao: `${pg.bandeira} final ${pg.final} · ${pg.parcelas > 1 ? `${pg.parcelas}x de ${formatarPreco(pedido.total / pg.parcelas)} sem juros` : 'à vista'}`,
        pix: 'Pix · à vista',
        boleto: 'Boleto bancário · compensado',
      }[pg.metodo];
      return `
        <div class="flex items-start gap-4 border border-tinta bg-papel-escuro/50 p-6">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vinho text-papel" aria-hidden="true">✓</span>
          <div>
            <p class="font-serif text-2xl">Pagamento aprovado</p>
            <p class="mt-1 text-sm text-grafite">${como}</p>
          </div>
        </div>`;
    }

    if (pg.metodo === 'pix') {
      return `
        <div class="grid gap-6 border border-tinta p-6 sm:grid-cols-[180px_1fr]">
          <div class="mx-auto h-44 w-44 border border-linha bg-white p-1 sm:mx-0">${qrDemonstracao(pg.codigo)}</div>
          <div>
            <p class="font-serif text-2xl">Pague com Pix</p>
            <p class="mt-1 text-sm text-grafite">Abra o app do seu banco, escolha <strong>Pix › Ler QR Code</strong> ou use o código “copia e cola”.</p>
            <p class="mt-3 text-sm">Expira em <strong id="pix-relogio" class="tabular-nums">--:--</strong></p>
            <div class="mt-4 flex gap-2">
              <input readonly value="${escaparHTML(pg.codigo)}" class="campo min-w-0 flex-1 truncate text-xs" aria-label="Código Pix copia e cola">
              <button type="button" data-acao="copiar" data-texto="${escaparHTML(pg.codigo)}" class="shrink-0 bg-tinta px-4 text-xs font-semibold uppercase tracking-widest text-papel hover:bg-vinho">Copiar</button>
            </div>
            <button type="button" data-acao="simular-pagamento" class="mt-4 text-xs text-grafite underline hover:text-vinho">Simular pagamento aprovado (demonstração)</button>
          </div>
        </div>`;
    }

    return `
      <div class="border border-tinta p-6">
        <p class="font-serif text-2xl">Boleto gerado</p>
        <p class="mt-1 text-sm text-grafite">Vencimento: <strong class="text-tinta">${formatarData(pg.vencimento)}</strong>. A compensação leva até 2 dias úteis.</p>
        <div class="mt-5 bg-white p-3">${codigoDeBarras(pg.linhaDigitavel)}</div>
        <div class="mt-4 flex gap-2">
          <input readonly value="${pg.linhaDigitavel}" class="campo min-w-0 flex-1 truncate font-mono text-xs" aria-label="Linha digitável do boleto">
          <button type="button" data-acao="copiar" data-texto="${pg.linhaDigitavel}" class="shrink-0 bg-tinta px-4 text-xs font-semibold uppercase tracking-widest text-papel hover:bg-vinho">Copiar</button>
        </div>
        <button type="button" data-acao="simular-pagamento" class="mt-4 text-xs text-grafite underline hover:text-vinho">Simular compensação do boleto (demonstração)</button>
      </div>`;
  }

  function linhaDoTempo() {
    const pago = pedido.status === 'pago';
    const etapas = [
      ['Pedido recebido', true],
      ['Pagamento aprovado', pago],
      ['Em separação', pago],
      ['Enviado', false],
    ];
    return `
      <ol class="grid grid-cols-4 gap-2 text-center text-[11px] uppercase tracking-widest">
        ${etapas.map(([nome, feito]) => `
          <li>
            <span class="mx-auto mb-2 block h-1.5 ${feito ? 'bg-vinho' : 'bg-linha'}"></span>
            <span class="${feito ? 'text-tinta' : 'text-grafite/70'}">${nome}</span>
          </li>`).join('')}
      </ol>`;
  }

  function render() {
    clearInterval(relogio);
    const pg = pedido.pagamento;
    const e = pedido.endereco;
    const titulo = pedido.status === 'pago'
      ? 'Pedido confirmado!'
      : 'Falta só o pagamento.';
    const subtitulo = pedido.status === 'pago'
      ? `Obrigado, ${escaparHTML(pedido.cliente.nome.split(' ')[0])}! Seu pedido já está sendo separado, com marca-páginas de brinde.`
      : `Assim que o pagamento for confirmado, começamos a separar o seu pedido.`;

    alvo.innerHTML = `
      <header class="border-b border-linha pb-8">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-vinho">Pedido ${escaparHTML(pedido.numero)}</p>
        <h1 class="mt-3 font-serif text-4xl sm:text-5xl">${titulo}</h1>
        <p class="mt-3 max-w-xl text-grafite">${subtitulo}</p>
      </header>

      <div class="grid gap-10 pt-8 lg:grid-cols-12">
        <div class="space-y-8 lg:col-span-7">
          ${blocoPagamento()}
          ${linhaDoTempo()}

          <section>
            <h2 class="font-serif text-2xl">Itens</h2>
            <ul class="mt-4 divide-y divide-linha border-y border-linha">
              ${pedido.itens.map((i) => {
                const produto = buscarProduto(i.id);
                return `
                  <li class="flex items-center gap-4 py-4">
                    <span class="block h-20 w-16 shrink-0 overflow-hidden bg-papel-escuro">${produto ? fotoProduto(produto, i.cor, { rotulo: false }) : ''}</span>
                    <span class="min-w-0 flex-1">
                      <span class="block font-serif text-lg">${escaparHTML(i.nome)}</span>
                      <span class="text-sm text-grafite">${i.corNome ? `${escaparHTML(i.corNome)} · ` : ''}Tam. ${escaparHTML(i.tamanho)} · ${i.quantidade}x ${formatarPreco(i.preco)}</span>
                    </span>
                    <span>${formatarPreco(i.preco * i.quantidade)}</span>
                  </li>`;
              }).join('')}
            </ul>
          </section>
        </div>

        <aside class="space-y-6 lg:col-span-5">
          <div class="border border-linha bg-papel-escuro/40 p-6">
            <h2 class="font-serif text-2xl">Resumo</h2>
            <dl class="mt-4 space-y-2 text-sm">
              <div class="flex justify-between"><dt class="text-grafite">Subtotal</dt><dd>${formatarPreco(pedido.subtotal)}</dd></div>
              <div class="flex justify-between"><dt class="text-grafite">Frete (${pedido.frete.nome})</dt><dd>${pedido.frete.valor ? formatarPreco(pedido.frete.valor) : 'Grátis'}</dd></div>
              ${pedido.desconto ? `<div class="flex justify-between text-vinho"><dt>Desconto Pix</dt><dd>− ${formatarPreco(pedido.desconto)}</dd></div>` : ''}
              <div class="flex items-baseline justify-between border-t border-linha pt-3"><dt class="uppercase tracking-widest">Total</dt><dd class="font-serif text-2xl">${formatarPreco(pedido.total)}</dd></div>
            </dl>
          </div>
          <div class="border border-linha p-6 text-sm leading-relaxed">
            <h2 class="font-serif text-xl">Entrega</h2>
            <p class="mt-2">${escaparHTML(e.rua)}, ${escaparHTML(e.numero)}${e.complemento ? ` · ${escaparHTML(e.complemento)}` : ''}<br>
              ${escaparHTML(e.bairro)} · ${escaparHTML(e.cidade)}/${e.uf} · ${e.cep}</p>
            <p class="mt-2 text-grafite">${pedido.frete.nome}: ${pedido.frete.prazo} após a confirmação do pagamento.</p>
            <p class="mt-4 text-grafite">Enviamos os detalhes para <strong class="text-tinta">${escaparHTML(pedido.cliente.email)}</strong>.</p>
            <p class="mt-1 text-xs text-grafite">Pedido feito em ${formatarData(pedido.criadoEm, { dateStyle: 'short', timeStyle: 'short' })}.</p>
          </div>
          <div class="flex flex-col gap-3">
            <a href="produtos.html" class="bg-tinta px-6 py-4 text-center text-sm font-semibold uppercase tracking-widest text-papel hover:bg-vinho">Continuar comprando</a>
            <a href="${linkWhatsApp(`Olá! Tenho uma dúvida sobre o pedido ${pedido.numero}.`)}" target="_blank" rel="noopener" class="text-center text-sm underline hover:text-vinho">Dúvidas? Fale com a gente no WhatsApp</a>
          </div>
        </aside>
      </div>`;

    // Contagem regressiva do Pix
    if (pedido.status === 'aguardando' && pg.metodo === 'pix') {
      const atualizar = () => {
        const restante = new Date(pg.expiraEm).getTime() - Date.now();
        const el = document.getElementById('pix-relogio');
        if (!el) return;
        if (restante <= 0) {
          clearInterval(relogio);
          el.parentElement.innerHTML = 'O código expirou. <button type="button" data-acao="novo-pix" class="underline hover:text-vinho">Gerar novo código</button>';
          return;
        }
        const min = String(Math.floor(restante / 60000)).padStart(2, '0');
        const seg = String(Math.floor((restante % 60000) / 1000)).padStart(2, '0');
        el.textContent = `${min}:${seg}`;
      };
      atualizar();
      relogio = setInterval(atualizar, 1000);
    }
  }

  alvo.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    if (botao.dataset.acao === 'copiar') copiarTexto(botao.dataset.texto, botao);

    if (botao.dataset.acao === 'simular-pagamento') {
      pedido = atualizarPedido(pedido.numero, { status: 'pago' });
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (botao.dataset.acao === 'novo-pix') {
      const expiraEm = new Date(Date.now() + LOJA.validadePixMinutos * 60000).toISOString();
      pedido = atualizarPedido(pedido.numero, { pagamento: { ...pedido.pagamento, expiraEm } });
      render();
    }
  });

  render();
}
