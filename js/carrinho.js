/* ==========================================================================
   Entrelinhas — carrinho de compras
   Os itens ficam salvos no localStorage do navegador e o pedido é
   finalizado no checkout (checkout.html / js/checkout.js).
   ========================================================================== */

const Carrinho = (() => {
  const CHAVE = 'entrelinhas:carrinho';
  const MAX_POR_ITEM = 20;

  // Cada item salvo: { id, tamanho, cor, quantidade }
  function ler() {
    try {
      const itens = JSON.parse(localStorage.getItem(CHAVE)) ?? [];
      if (!Array.isArray(itens)) return [];
      return itens
        .filter((i) => buscarProduto(i.id) && i.quantidade > 0)
        // Itens sem cor (ou com cor que não existe mais) ficam com a cor padrão do produto
        .map((i) => ({ ...i, cor: corProduto(buscarProduto(i.id), i.cor).id }));
    } catch {
      return [];
    }
  }

  const mesmoItem = (i, id, tamanho, cor) => i.id === id && i.tamanho === tamanho && i.cor === cor;

  function salvar(itens) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens));
    } catch {
      // Sem localStorage (ex.: modo privado restrito): o carrinho vale só nesta página.
    }
    render();
    document.dispatchEvent(new CustomEvent('carrinho:atualizado'));
  }

  function adicionar(id, tamanho, cor, quantidade = 1) {
    const itens = ler();
    const existente = itens.find((i) => mesmoItem(i, id, tamanho, cor));
    if (existente) {
      existente.quantidade = Math.min(MAX_POR_ITEM, existente.quantidade + quantidade);
    } else {
      itens.push({ id, tamanho, cor, quantidade: Math.min(MAX_POR_ITEM, quantidade) });
    }
    salvar(itens);
  }

  function alterarQuantidade(id, tamanho, cor, delta) {
    const itens = ler()
      .map((i) => (mesmoItem(i, id, tamanho, cor)
        ? { ...i, quantidade: Math.min(MAX_POR_ITEM, i.quantidade + delta) }
        : i))
      .filter((i) => i.quantidade > 0);
    salvar(itens);
  }

  function remover(id, tamanho, cor) {
    salvar(ler().filter((i) => !mesmoItem(i, id, tamanho, cor)));
  }

  function limpar() {
    salvar([]);
  }

  // Itens com os dados completos do produto
  function itens() {
    return ler().map((i) => ({ ...i, produto: buscarProduto(i.id) }));
  }

  function total(lista = itens()) {
    return lista.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0);
  }

  function quantidadeTotal() {
    return ler().reduce((soma, i) => soma + i.quantidade, 0);
  }

  /* ----------------------------------------------------------------------
     Interface (gaveta lateral montada pelo main.js)
     ---------------------------------------------------------------------- */

  function htmlItem({ produto, tamanho, cor, quantidade }) {
    const dados = `data-id="${produto.id}" data-tamanho="${escaparHTML(tamanho)}" data-cor="${cor}"`;
    const link = urlProduto(produto, cor);
    return `
      <li class="flex gap-4 py-5">
        <a href="${link}" class="block h-24 w-20 shrink-0 overflow-hidden bg-papel-escuro">${fotoProduto(produto, cor, { rotulo: false })}</a>
        <div class="flex min-w-0 flex-1 flex-col">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <a href="${link}" class="font-serif leading-snug hover:text-vinho">${escaparHTML(produto.nome)}</a>
              <p class="mt-0.5 text-xs text-grafite">${corProduto(produto, cor).nome} · Tam. ${escaparHTML(tamanho)}</p>
            </div>
            <button type="button" data-acao="remover" ${dados} class="text-xs text-grafite underline hover:text-vinho">Remover</button>
          </div>
          <div class="mt-auto flex items-center justify-between pt-3">
            <div class="inline-flex items-center border border-linha">
              <button type="button" data-acao="diminuir" ${dados} class="h-8 w-8 hover:bg-papel-escuro" aria-label="Diminuir quantidade de ${escaparHTML(produto.nome)}">−</button>
              <span class="w-8 text-center text-sm" aria-live="polite">${quantidade}</span>
              <button type="button" data-acao="aumentar" ${dados} class="h-8 w-8 hover:bg-papel-escuro" aria-label="Aumentar quantidade de ${escaparHTML(produto.nome)}">+</button>
            </div>
            <p class="text-sm font-medium">${formatarPreco(produto.preco * quantidade)}</p>
          </div>
        </div>
      </li>`;
  }

  function render() {
    const lista = document.getElementById('carrinho-lista');
    const rodape = document.getElementById('carrinho-rodape');
    if (!lista || !rodape) return;

    const atuais = itens();
    const qtd = atuais.reduce((soma, i) => soma + i.quantidade, 0);

    document.querySelectorAll('[data-contador-carrinho]').forEach((el) => {
      el.textContent = qtd;
      el.hidden = qtd === 0;
    });
    document.getElementById('carrinho-titulo-qtd').textContent = qtd ? `(${qtd})` : '';

    if (!atuais.length) {
      lista.innerHTML = `
        <li class="flex h-full flex-col items-center justify-center py-16 text-center">
          <p class="font-serif text-2xl">Seu carrinho está em branco.</p>
          <p class="mt-2 max-w-xs text-sm text-grafite">Como a primeira página de um livro que ainda vai ser escrito.</p>
          <a href="produtos.html" class="mt-6 bg-tinta px-6 py-3 text-xs font-medium uppercase tracking-widest text-papel hover:bg-vinho">Explorar a estante</a>
        </li>`;
      rodape.hidden = true;
      return;
    }

    lista.innerHTML = atuais.map(htmlItem).join('');

    const valorTotal = total(atuais);
    const falta = LOJA.freteGratisAcima - valorTotal;
    const progresso = Math.min(100, (valorTotal / LOJA.freteGratisAcima) * 100);

    rodape.hidden = false;
    rodape.innerHTML = `
      <div class="mb-4">
        <p class="text-xs text-grafite">${falta > 0
          ? `Faltam <strong class="text-tinta">${formatarPreco(falta)}</strong> para o frete grátis.`
          : '<strong class="text-vinho">Frete grátis desbloqueado!</strong> Final feliz encontrado.'}</p>
        <div class="mt-2 h-1 w-full bg-linha"><div class="h-1 bg-vinho transition-all" style="width:${progresso}%"></div></div>
      </div>
      <div class="flex items-baseline justify-between">
        <span class="text-sm uppercase tracking-widest">Total</span>
        <span class="font-serif text-2xl">${formatarPreco(valorTotal)}</span>
      </div>
      <p class="mt-1 text-xs text-grafite">Frete calculado no checkout. Cartão em até ${LOJA.parcelasSemJuros}x sem juros, Pix com ${LOJA.descontoPix * 100}% de desconto ou boleto.</p>
      <a href="checkout.html"
        class="mt-4 flex items-center justify-center gap-2 bg-vinho px-6 py-4 text-sm font-medium uppercase tracking-widest text-papel transition hover:bg-vinho-escuro">
        Finalizar compra
      </a>
      <div class="mt-3 flex justify-between text-xs">
        <button type="button" data-acao="fechar-carrinho" class="text-grafite underline hover:text-tinta">Continuar comprando</button>
        <button type="button" data-acao="limpar" class="text-grafite underline hover:text-vinho">Esvaziar carrinho</button>
      </div>`;
  }

  function abrir() {
    abrirGaveta('carrinho');
  }

  function iniciar() {
    const gaveta = document.getElementById('carrinho');
    if (!gaveta) return;

    gaveta.addEventListener('click', (e) => {
      const alvo = e.target.closest('[data-acao]');
      if (!alvo) return;
      const { id, tamanho, cor } = alvo.dataset;

      switch (alvo.dataset.acao) {
        case 'aumentar': alterarQuantidade(id, tamanho, cor, 1); break;
        case 'diminuir': alterarQuantidade(id, tamanho, cor, -1); break;
        case 'remover': remover(id, tamanho, cor); break;
        case 'limpar': limpar(); break;
        case 'fechar-carrinho': fecharGavetas(); break;
      }
    });

    // Mantém abas diferentes do navegador sincronizadas
    window.addEventListener('storage', (e) => {
      if (e.key === CHAVE) render();
    });

    render();
  }

  return { adicionar, alterarQuantidade, remover, limpar, itens, total, quantidadeTotal, abrir, iniciar, render };
})();
