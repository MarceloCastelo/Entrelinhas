/* ==========================================================================
   Entrelinhas — catálogo de produtos
   Para adicionar um produto, basta incluir um novo objeto em PRODUTOS e
   colocar as fotos em assets/img/produtos/<pasta>/<arquivo>.jpeg.
   ========================================================================== */

const CATEGORIAS = {
  musica: {
    nome: 'Música',
    descricao: 'Versos que tocaram no rádio, na vitrola e na memória, agora estampados.',
  },
  filmes: {
    nome: 'Filmes',
    descricao: 'Sagas que saíram das páginas, ganharam as telas e agora vão para o guarda-roupa.',
  },
  livros: {
    nome: 'Livros',
    descricao: 'Frases sublinhadas a lápis, direto da estante para o peito.',
  },
};

// Cores de malha disponíveis. "hex" é usado nas bolinhas de seleção de cor.
const CORES = {
  branca:   { nome: 'Branca',       hex: '#F4F4F2' },
  preta:    { nome: 'Preta',        hex: '#1F1F1F' },
  vermelha: { nome: 'Vermelha',     hex: '#B32523' },
  vinho:    { nome: 'Vinho',        hex: '#6E1D24' },
  amarela:  { nome: 'Amarela',      hex: '#E09A14' },
  laranja:  { nome: 'Laranja',      hex: '#C4552E' },
  ferrugem: { nome: 'Ferrugem',     hex: '#7E3417' },
  marinho:  { nome: 'Azul-marinho', hex: '#26324A' },
};

const TAMANHOS = {
  roupa: ['P', 'M', 'G', 'GG'],
};

const DETALHES = '100% algodão penteado fio 30.1, gola careca com ribana e estampa em silk à base d\'água.';

const PASTA_FOTOS = 'assets/img/produtos';

// "cores" liga cada cor (chave de CORES) ao nome do arquivo da foto dentro da pasta do produto.
// A primeira cor da lista é a que aparece por padrão.
const PRODUTOS = [
  {
    id: 'as-vezes-no-silencio-da-noite',
    nome: 'Às vezes no silêncio da noite',
    tema: 'Caetano Veloso',
    categoria: 'musica',
    preco: 89.9,
    pasta: 'caetano_veloso',
    cores: { preta: 'preta', vinho: 'vermelha', branca: 'branca' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Traço fino, violão no colo e o verso que todo mundo já cantou baixinho pensando em alguém. Para quem se pega imaginando nós dois.',
    referencia: 'Caetano Veloso, "Sozinho" (composição de Peninha).',
    destaque: true,
  },
  {
    id: 'guarde-um-pedaco-de-mim',
    nome: 'Guarde um pedaço de mim',
    tema: 'Gal Costa',
    categoria: 'musica',
    preco: 89.9,
    pasta: 'gal_costa',
    cores: { vermelha: 'vermelha', preta: 'preta', branca: 'branca' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Cabelo solto, microfone na mão e uma voz que não cabia em lugar nenhum. Uma homenagem a Gal, para vestir e cantar junto.',
    referencia: 'Homenagem a Gal Costa.',
    novo: true,
  },
  {
    id: 'olhos-de-cigana',
    nome: 'Olhos de cigana oblíqua e dissimulada',
    tema: 'Dom Casmurro',
    categoria: 'livros',
    preco: 89.9,
    pasta: 'dom_casmurro',
    cores: { branca: 'branca', preta: 'preta', vinho: 'vermelha' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Olhos de ressaca, mãos que se encontram e a dúvida mais famosa da literatura brasileira. Se Capitu traiu ou não, a gente deixa para o clube do livro.',
    referencia: 'Machado de Assis, "Dom Casmurro" (1899).',
    destaque: true,
  },
  {
    id: 'amar-e-mudar-a-alma-de-casa',
    nome: 'Amar é mudar a alma de casa',
    tema: 'Mario Quintana',
    categoria: 'livros',
    preco: 89.9,
    pasta: 'mario_quitanda',
    cores: { marinho: 'azul', branca: 'branca', preta: 'preta', vinho: 'vermelha' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Uma casinha, um coração e a definição de amor mais bonita que cabe numa camiseta. Quintana entendia de mudanças.',
    referencia: 'Mario Quintana.',
    novo: true,
  },
  {
    id: 'tu-te-tornas-eternamente-responsavel',
    nome: 'Tu te tornas eternamente responsável',
    tema: 'O Pequeno Príncipe',
    categoria: 'livros',
    preco: 89.9,
    pasta: 'pequeno_principe',
    cores: { preta: 'preto', marinho: 'azul', branca: 'branco' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'A rosa, a raposa e o pequeno asteroide emoldurando a frase que atravessa gerações. Presente certo para quem você cativou.',
    referencia: 'Antoine de Saint-Exupéry, "O Pequeno Príncipe" (1943).',
    destaque: true,
  },
  {
    id: 'happee-birthdae-harry',
    nome: 'Happee Birthdae Harry',
    tema: 'Harry Potter',
    categoria: 'filmes',
    preco: 89.9,
    pasta: 'harry_potter',
    cores: { amarela: 'amarela', vinho: 'vermelha', preta: 'preta', branca: 'branca' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'O bolo amassado, de cobertura rosa e letras tortas, que Hagrid entregou na cabana do rochedo. O melhor presente de aniversário do mundo bruxo.',
    referencia: 'J. K. Rowling, "Harry Potter e a Pedra Filosofal" (1997), levado aos cinemas em 2001.',
    destaque: true,
  },
  {
    id: 'o-tordo',
    nome: 'O Tordo',
    tema: 'Jogos Vorazes',
    categoria: 'filmes',
    preco: 89.9,
    pasta: 'hunger_games',
    cores: { ferrugem: 'laranja', preta: 'preta', branca: 'branca' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'O broche que virou símbolo de uma revolução. Para quem se voluntaria como tributo sem pensar duas vezes.',
    referencia: 'Suzanne Collins, "Jogos Vorazes" (2008), levado aos cinemas em 2012.',
    novo: true,
  },
  {
    id: 'acampamento-meio-sangue',
    nome: 'Acampamento Meio-Sangue',
    tema: 'Percy Jackson',
    categoria: 'filmes',
    preco: 89.9,
    pasta: 'percy_jackson',
    cores: { laranja: 'laranja', preta: 'preta', branca: 'branca' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Espada de bronze celestial e a faixa do acampamento para quem tem certeza de que é filho de algum deus. Laranja, como manda o uniforme.',
    referencia: 'Rick Riordan, "Percy Jackson e os Olimpianos" (2005), levado aos cinemas e ao streaming.',
    novo: true,
  },
];

/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */

const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function formatarPreco(valor) {
  return formatadorMoeda.format(valor).replace(/ /g, ' ');
}

function normalizar(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buscarProduto(id) {
  return PRODUTOS.find((p) => p.id === id);
}

function nomeCategoria(produto) {
  return CATEGORIAS[produto.categoria]?.nome ?? '';
}

// Lista de cores do produto: [{ id, nome, hex, imagem }]
function coresProduto(produto) {
  return Object.entries(produto.cores).map(([id, arquivo]) => ({
    id,
    ...CORES[id],
    imagem: `${PASTA_FOTOS}/${produto.pasta}/${arquivo}.jpeg`,
  }));
}

// Cor escolhida, ou a padrão (primeira) se o id não existir no produto
function corProduto(produto, corId) {
  const cores = coresProduto(produto);
  return cores.find((c) => c.id === corId) ?? cores[0];
}

function urlProduto(produto, corId) {
  const cor = corId && corId !== corProduto(produto).id ? `&cor=${corId}` : '';
  return `produto.html?id=${produto.id}${cor}`;
}

/* --------------------------------------------------------------------------
   Fotos
   -------------------------------------------------------------------------- */

function fotoProduto(produto, corId, { classe = '', rotulo = true, prioridade = false } = {}) {
  const cor = corProduto(produto, corId);
  const alt = rotulo ? `Camiseta ${produto.nome}, de ${produto.tema}, na cor ${cor.nome.toLowerCase()}` : '';
  return `<img src="${cor.imagem}" alt="${escaparHTML(alt)}" class="h-full w-full object-cover ${classe}"
    ${prioridade ? '' : 'loading="lazy"'} decoding="async">`;
}

function bolinhasCores(produto, tamanho = 'h-3 w-3') {
  return coresProduto(produto)
    .map((c) => `<span class="${tamanho} rounded-full border border-tinta/20" style="background:${c.hex}" title="${c.nome}"></span>`)
    .join('');
}

/* --------------------------------------------------------------------------
   Card de produto (usado na home, no catálogo e nos relacionados)
   Ao passar o mouse, mostra a peça na segunda cor.
   -------------------------------------------------------------------------- */

function cardProduto(p, corId = '') {
  const cores = coresProduto(p);
  const principal = corProduto(p, corId);
  const alternativa = cores.find((c) => c.id !== principal.id);
  const selo = p.novo
    ? '<span class="absolute left-3 top-3 bg-vinho px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-papel">Novo</span>'
    : '';
  return `
    <a href="${urlProduto(p, principal.id)}" class="group block">
      <div class="foto-zoom relative aspect-[4/5] overflow-hidden bg-papel-escuro">
        ${fotoProduto(p, principal.id)}
        ${alternativa ? `<div class="foto-alternativa absolute inset-0">${fotoProduto(p, alternativa.id, { rotulo: false })}</div>` : ''}
        ${selo}
        <span class="absolute bottom-3 right-3 translate-y-2 bg-tinta px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-papel opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Ver peça</span>
      </div>
      <div class="mt-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-[11px] uppercase tracking-[0.18em] text-grafite">${escaparHTML(p.tema)}</p>
          <h3 class="mt-0.5 font-serif text-lg leading-snug group-hover:text-vinho">${escaparHTML(p.nome)}</h3>
          <div class="mt-2 flex items-center gap-1.5" aria-label="${cores.length} cores disponíveis">${bolinhasCores(p)}</div>
        </div>
        <p class="whitespace-nowrap pt-4 text-sm font-medium">${formatarPreco(p.preco)}</p>
      </div>
    </a>`;
}

/* --------------------------------------------------------------------------
   Página de catálogo (produtos.html)
   Filtros ficam na URL: ?categoria=&cor=&busca=&ordem=
   -------------------------------------------------------------------------- */

function filtrarProdutos({ categoria = '', cor = '', busca = '', ordem = '' }) {
  const termo = normalizar(busca);

  let lista = PRODUTOS.filter((p) => {
    if (categoria && p.categoria !== categoria) return false;
    if (cor && !p.cores[cor]) return false;
    if (termo) {
      const alvo = normalizar(
        [p.nome, p.tema, p.descricao, p.referencia ?? '', nomeCategoria(p), ...coresProduto(p).map((c) => c.nome)].join(' ')
      );
      if (!termo.split(/\s+/).every((palavra) => alvo.includes(palavra))) return false;
    }
    return true;
  });

  if (ordem === 'menor-preco') lista = [...lista].sort((a, b) => a.preco - b.preco);
  if (ordem === 'maior-preco') lista = [...lista].sort((a, b) => b.preco - a.preco);
  if (ordem === 'a-z') lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  if (ordem === 'novidades') lista = [...lista].sort((a, b) => Number(!!b.novo) - Number(!!a.novo));

  return lista;
}

function iniciarCatalogo() {
  const grade = document.getElementById('grade-produtos');
  if (!grade) return;

  const form = document.getElementById('filtros');
  const chips = document.getElementById('chips-categorias');
  const titulo = document.getElementById('titulo-catalogo');
  const subtitulo = document.getElementById('subtitulo-catalogo');
  const contador = document.getElementById('contador-produtos');
  const vazio = document.getElementById('catalogo-vazio');

  const params = new URLSearchParams(location.search);
  const estado = {
    categoria: params.get('categoria') ?? '',
    cor: params.get('cor') ?? '',
    busca: params.get('busca') ?? '',
    ordem: params.get('ordem') ?? '',
  };

  // Monta os chips de categoria, com a quantidade de peças em cada uma
  const opcoesChips = [
    ['', 'Todos', PRODUTOS.length],
    ...Object.entries(CATEGORIAS).map(([slug, c]) => [slug, c.nome, PRODUTOS.filter((p) => p.categoria === slug).length]),
  ];
  chips.innerHTML = opcoesChips
    .map(([slug, nome, qtd]) => `<button type="button" data-categoria="${slug}"
      class="chip shrink-0 border px-4 py-2 text-sm transition">${nome} <span class="ml-1 text-xs opacity-60">${qtd}</span></button>`)
    .join('');

  // Monta o select de cores (só as cores que existem em algum produto)
  const selectCor = form.elements.cor;
  const coresUsadas = Object.entries(CORES).filter(([id]) => PRODUTOS.some((p) => p.cores[id]));
  selectCor.insertAdjacentHTML(
    'beforeend',
    coresUsadas.map(([id, c]) => `<option value="${id}">${c.nome}</option>`).join('')
  );

  form.elements.busca.value = estado.busca;
  selectCor.value = estado.cor;
  form.elements.ordem.value = estado.ordem;

  function atualizarURL() {
    const novos = new URLSearchParams();
    Object.entries(estado).forEach(([chave, valor]) => valor && novos.set(chave, valor));
    const query = novos.toString();
    history.replaceState(null, '', query ? `?${query}` : location.pathname);
  }

  function render() {
    const lista = filtrarProdutos(estado);

    chips.querySelectorAll('.chip').forEach((chip) => {
      const ativo = chip.dataset.categoria === estado.categoria;
      chip.classList.toggle('bg-tinta', ativo);
      chip.classList.toggle('text-papel', ativo);
      chip.classList.toggle('border-tinta', ativo);
      chip.classList.toggle('border-linha', !ativo);
      chip.classList.toggle('hover:border-tinta', !ativo);
      chip.setAttribute('aria-pressed', ativo);
    });

    // Título dinâmico
    const categoria = CATEGORIAS[estado.categoria];
    if (estado.busca) {
      titulo.textContent = `Resultados para “${estado.busca}”`;
    } else if (categoria) {
      titulo.textContent = categoria.nome;
    } else {
      titulo.textContent = 'Toda a estante';
    }
    subtitulo.textContent = categoria?.descricao
      ?? 'Camisetas inspiradas na música, no cinema e na literatura que a gente carrega no peito.';

    contador.textContent = `${lista.length} ${lista.length === 1 ? 'título' : 'títulos'}`;
    grade.innerHTML = lista.map((p) => cardProduto(p, estado.cor)).join('');
    vazio.hidden = lista.length > 0;
  }

  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    estado.categoria = chip.dataset.categoria;
    atualizarURL();
    render();
  });

  form.addEventListener('submit', (e) => e.preventDefault());

  form.elements.busca.addEventListener('input', (e) => {
    estado.busca = e.target.value.trim();
    atualizarURL();
    render();
  });

  selectCor.addEventListener('change', (e) => {
    estado.cor = e.target.value;
    atualizarURL();
    render();
  });

  form.elements.ordem.addEventListener('change', (e) => {
    estado.ordem = e.target.value;
    atualizarURL();
    render();
  });

  document.getElementById('limpar-filtros').addEventListener('click', () => {
    Object.keys(estado).forEach((chave) => (estado[chave] = ''));
    form.reset();
    atualizarURL();
    render();
  });

  render();
}

/* --------------------------------------------------------------------------
   Página de produto (produto.html?id=...&cor=...)
   -------------------------------------------------------------------------- */

const GUIA_MEDIDAS = `
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="text-grafite"><tr><th class="py-2 pr-4 font-medium">Tamanho</th><th class="py-2 pr-4 font-medium">Largura</th><th class="py-2 font-medium">Comprimento</th></tr></thead>
      <tbody class="divide-y divide-linha">
        <tr><td class="py-2 pr-4">P</td><td class="py-2 pr-4">50 cm</td><td class="py-2">70 cm</td></tr>
        <tr><td class="py-2 pr-4">M</td><td class="py-2 pr-4">53 cm</td><td class="py-2">72 cm</td></tr>
        <tr><td class="py-2 pr-4">G</td><td class="py-2 pr-4">56 cm</td><td class="py-2">74 cm</td></tr>
        <tr><td class="py-2 pr-4">GG</td><td class="py-2 pr-4">59 cm</td><td class="py-2">76 cm</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mt-2 text-xs text-grafite">Medidas aproximadas da peça estendida.</p>`;

function blocoDetalhes(titulo, conteudo, aberto = false) {
  return `
    <details class="group border-b border-linha py-4" ${aberto ? 'open' : ''}>
      <summary class="flex cursor-pointer items-center justify-between text-sm font-medium uppercase tracking-widest">
        ${titulo}
        <span class="seta-details text-xl leading-none transition-transform">+</span>
      </summary>
      <div class="pt-3 text-sm leading-relaxed text-grafite">${conteudo}</div>
    </details>`;
}

function iniciarPaginaProduto() {
  const alvo = document.getElementById('produto');
  if (!alvo) return;

  const params = new URLSearchParams(location.search);
  const p = buscarProduto(params.get('id'));

  if (!p) {
    alvo.innerHTML = `
      <div class="py-24 text-center">
        <p class="text-sm uppercase tracking-[0.3em] text-vinho">Página em branco</p>
        <h1 class="mt-4 font-serif text-4xl sm:text-5xl">Esse produto saiu da estante.</h1>
        <p class="mx-auto mt-4 max-w-md text-grafite">Talvez tenha sido emprestado e nunca devolvido. Acontece com os melhores livros.</p>
        <a href="produtos.html" class="mt-8 inline-block bg-tinta px-8 py-3 text-sm font-medium uppercase tracking-widest text-papel hover:bg-vinho">Ver catálogo</a>
      </div>`;
    document.getElementById('relacionados')?.closest('section')?.remove();
    return;
  }

  const categoria = CATEGORIAS[p.categoria];
  const cores = coresProduto(p);
  let corAtual = corProduto(p, params.get('cor'));

  document.title = `${p.nome} — ${p.tema} | Entrelinhas`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', p.descricao);

  const botoesTamanho = p.tamanhos
    .map((t) => `
      <label class="cursor-pointer">
        <input type="radio" name="tamanho" value="${t}" class="peer sr-only">
        <span class="flex h-11 min-w-11 items-center justify-center border border-linha px-3 text-sm transition peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-papel peer-focus-visible:ring-2 peer-focus-visible:ring-vinho hover:border-tinta">${t}</span>
      </label>`)
    .join('');

  const botoesCor = cores
    .map((c) => `
      <label class="cursor-pointer" title="${c.nome}">
        <input type="radio" name="cor" value="${c.id}" class="peer sr-only" ${c.id === corAtual.id ? 'checked' : ''}>
        <span class="block rounded-full border-2 border-transparent p-0.5 transition peer-checked:border-tinta peer-focus-visible:ring-2 peer-focus-visible:ring-vinho hover:border-grafite">
          <span class="block h-8 w-8 rounded-full border border-tinta/20" style="background:${c.hex}"></span>
        </span>
        <span class="sr-only">${c.nome}</span>
      </label>`)
    .join('');

  const miniaturas = cores
    .map((c) => `
      <button type="button" data-miniatura="${c.id}" class="aspect-[4/5] w-full overflow-hidden border-2 bg-papel-escuro transition" aria-label="Ver na cor ${c.nome.toLowerCase()}">
        ${fotoProduto(p, c.id, { rotulo: false })}
      </button>`)
    .join('');

  alvo.innerHTML = `
    <nav aria-label="Trilha" class="mb-6 text-xs uppercase tracking-widest text-grafite">
      <a href="index.html" class="hover:text-vinho">Início</a> <span class="mx-1">/</span>
      <a href="produtos.html?categoria=${p.categoria}" class="hover:text-vinho">${categoria.nome}</a> <span class="mx-1">/</span>
      <span class="text-tinta">${escaparHTML(p.nome)}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <div id="foto-principal" class="relative aspect-[4/5] overflow-hidden bg-papel-escuro">
          ${fotoProduto(p, corAtual.id, { prioridade: true })}
          ${p.novo ? '<span class="absolute left-4 top-4 bg-vinho px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-papel">Novo</span>' : ''}
        </div>
        <div class="mt-3 grid grid-cols-4 gap-3">${miniaturas}</div>
      </div>

      <div>
        <a href="produtos.html?categoria=${p.categoria}" class="text-xs font-medium uppercase tracking-[0.25em] text-vinho hover:underline">${categoria.nome} · ${escaparHTML(p.tema)}</a>
        <h1 class="mt-3 font-serif text-4xl leading-tight sm:text-5xl">${escaparHTML(p.nome)}</h1>
        <p class="mt-2 text-sm text-grafite">Camiseta · <span id="cor-descricao">${corAtual.nome}</span></p>

        <p class="mt-6 text-2xl font-medium">${formatarPreco(p.preco)}</p>
        <p class="text-sm text-grafite">
          ou ${LOJA.parcelasSemJuros}x de ${formatarPreco(p.preco / LOJA.parcelasSemJuros)} sem juros ·
          <strong class="font-medium text-tinta">${formatarPreco(p.preco * (1 - LOJA.descontoPix))} no Pix</strong>
        </p>

        <p class="mt-6 max-w-prose leading-relaxed">${escaparHTML(p.descricao)}</p>
        ${p.referencia ? `<p class="mt-4 border-l-2 border-vinho pl-4 font-serif italic text-grafite">${escaparHTML(p.referencia)}</p>` : ''}

        <form id="form-produto" class="mt-8 space-y-6" novalidate>
          <fieldset>
            <legend class="mb-3 text-sm font-medium uppercase tracking-widest">
              Cor: <span id="cor-selecionada" class="normal-case tracking-normal text-grafite">${corAtual.nome}</span>
            </legend>
            <div class="flex flex-wrap gap-2">${botoesCor}</div>
          </fieldset>

          <fieldset>
            <legend class="mb-3 flex w-full items-center justify-between text-sm font-medium uppercase tracking-widest">
              Tamanho
              <a href="#guia-medidas" class="text-xs normal-case tracking-normal text-grafite underline hover:text-vinho">Guia de medidas</a>
            </legend>
            <div class="flex flex-wrap gap-2">${botoesTamanho}</div>
            <p id="erro-tamanho" class="mt-2 text-sm text-vinho" hidden>Escolha um tamanho antes de continuar.</p>
          </fieldset>

          <div>
            <p class="mb-3 text-sm font-medium uppercase tracking-widest">Quantidade</p>
            <div class="inline-flex items-center border border-linha">
              <button type="button" data-qtd="-1" class="h-11 w-11 text-lg hover:bg-papel-escuro" aria-label="Diminuir quantidade">−</button>
              <input id="quantidade" name="quantidade" type="number" min="1" max="20" value="1" inputmode="numeric"
                class="h-11 w-14 border-x border-linha bg-transparent text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" aria-label="Quantidade">
              <button type="button" data-qtd="1" class="h-11 w-11 text-lg hover:bg-papel-escuro" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <button type="submit" class="flex-1 bg-tinta px-6 py-4 text-sm font-medium uppercase tracking-widest text-papel transition hover:bg-vinho">
              Adicionar ao carrinho
            </button>
            <button type="button" id="comprar-agora" class="flex-1 border border-tinta px-6 py-4 text-sm font-medium uppercase tracking-widest transition hover:bg-tinta hover:text-papel">
              Comprar agora
            </button>
          </div>
        </form>

        <ul class="mt-8 space-y-2 text-sm text-grafite">
          <li>✦ Marca-páginas temático de brinde em todo pedido</li>
          <li>✦ Frete grátis acima de ${formatarPreco(LOJA.freteGratisAcima)}</li>
          <li>✦ Primeira troca grátis em até 30 dias</li>
        </ul>

        <div class="mt-8 border-t border-linha">
          ${blocoDetalhes('Detalhes da peça', DETALHES, true)}
          <div id="guia-medidas">${blocoDetalhes('Guia de medidas', GUIA_MEDIDAS)}</div>
          ${blocoDetalhes('Cuidados', 'Lave do avesso, com água fria, e não passe ferro sobre a estampa. Livros e roupas duram mais quando são bem tratados.')}
        </div>
      </div>
    </div>`;

  // Troca de cor: atualiza foto, miniaturas, textos e a URL
  const form = document.getElementById('form-produto');
  const fotoPrincipal = document.getElementById('foto-principal');

  function selecionarCor(corId) {
    corAtual = corProduto(p, corId);
    fotoPrincipal.querySelector('img').outerHTML = fotoProduto(p, corAtual.id, { prioridade: true });
    document.getElementById('cor-selecionada').textContent = corAtual.nome;
    document.getElementById('cor-descricao').textContent = corAtual.nome;
    form.querySelector(`[name="cor"][value="${corAtual.id}"]`).checked = true;
    alvo.querySelectorAll('[data-miniatura]').forEach((botao) => {
      const ativa = botao.dataset.miniatura === corAtual.id;
      botao.classList.toggle('border-tinta', ativa);
      botao.classList.toggle('border-transparent', !ativa);
      botao.setAttribute('aria-pressed', ativa);
    });
    history.replaceState(null, '', urlProduto(p, corAtual.id));
  }

  alvo.querySelectorAll('[data-miniatura]').forEach((botao) =>
    botao.addEventListener('click', () => selecionarCor(botao.dataset.miniatura))
  );
  selecionarCor(corAtual.id);

  // Controle de quantidade
  const inputQtd = document.getElementById('quantidade');
  const limitarQtd = (valor) => Math.min(20, Math.max(1, parseInt(valor, 10) || 1));

  alvo.querySelectorAll('[data-qtd]').forEach((botao) =>
    botao.addEventListener('click', () => {
      inputQtd.value = limitarQtd(Number(inputQtd.value) + Number(botao.dataset.qtd));
    })
  );
  inputQtd.addEventListener('change', () => (inputQtd.value = limitarQtd(inputQtd.value)));

  // Seleção de cor e tamanho
  const erroTamanho = document.getElementById('erro-tamanho');
  form.addEventListener('change', (e) => {
    if (e.target.name === 'tamanho') erroTamanho.hidden = true;
    if (e.target.name === 'cor') selecionarCor(e.target.value);
  });

  function lerEscolha() {
    const tamanho = form.querySelector('[name="tamanho"]:checked')?.value;
    if (!tamanho) {
      erroTamanho.hidden = false;
      form.querySelector('[name="tamanho"]').focus();
      return null;
    }
    return { tamanho, cor: corAtual.id, quantidade: limitarQtd(inputQtd.value) };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const escolha = lerEscolha();
    if (!escolha) return;
    Carrinho.adicionar(p.id, escolha.tamanho, escolha.cor, escolha.quantidade);
    Carrinho.abrir();
  });

  document.getElementById('comprar-agora').addEventListener('click', () => {
    const escolha = lerEscolha();
    if (!escolha) return;
    Carrinho.adicionar(p.id, escolha.tamanho, escolha.cor, escolha.quantidade);
    location.href = 'checkout.html';
  });

  // Produtos relacionados: mesma categoria primeiro, depois o restante
  const relacionados = [
    ...PRODUTOS.filter((r) => r.id !== p.id && r.categoria === p.categoria),
    ...PRODUTOS.filter((r) => r.id !== p.id && r.categoria !== p.categoria),
  ].slice(0, 4);

  document.getElementById('relacionados').innerHTML = relacionados.map((r) => cardProduto(r)).join('');
}
