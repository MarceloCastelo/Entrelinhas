/* ==========================================================================
   Entrelinhas — layout compartilhado e comportamentos gerais
   ========================================================================== */

// Dados da loja. Troque o número pelo WhatsApp real (DDI + DDD + número, só dígitos).
const LOJA = {
  whatsapp: '5511999999999',
  whatsappExibicao: '(11) 99999-9999',
  email: 'contato@entrelinhas.com.br',
  instagram: 'https://instagram.com/entrelinhas',
  tiktok: 'https://tiktok.com/@entrelinhas',
  freteGratisAcima: 199,
};

function linkWhatsApp(mensagem) {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

const ICONES = {
  busca: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  sacola: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12"/></svg>',
  fechar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  seta: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
  instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>',
  tiktok: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.2 4.4 5 4.6"/></svg>',
};

/* --------------------------------------------------------------------------
   Cabeçalho, mega menu, rodapé e gavetas
   -------------------------------------------------------------------------- */

function listaLinks(itens) {
  return itens
    .map(([href, texto]) => `<li><a href="${href}" class="text-sm text-grafite transition hover:text-vinho">${texto}</a></li>`)
    .join('');
}

const LINKS_ROUPAS = Object.entries(CATEGORIAS)
  .filter(([, c]) => c.grupo === 'roupas')
  .map(([slug, c]) => [`produtos.html?categoria=${slug}`, c.nome]);

const LINKS_ACESSORIOS = Object.entries(CATEGORIAS)
  .filter(([, c]) => c.grupo === 'acessorios')
  .map(([slug, c]) => [`produtos.html?categoria=${slug}`, c.nome]);

const LINKS_COLECOES = Object.entries(COLECOES).map(([slug, c]) => [`produtos.html?colecao=${slug}`, c.nome]);

function htmlCabecalho(pagina) {
  const ativo = (nome) => (pagina === nome ? 'text-vinho' : 'hover:text-vinho');

  return `
    <div class="bg-tinta text-papel">
      <p class="mx-auto max-w-site px-4 py-2 text-center text-[11px] uppercase tracking-[0.2em] sm:px-6">
        Marca-páginas de brinde em todo pedido <span class="mx-2 text-vinho">✦</span>
        <span class="hidden sm:inline">Frete grátis acima de ${formatarPreco(LOJA.freteGratisAcima)}</span>
      </p>
    </div>

    <header class="sticky top-0 z-40 border-b border-linha bg-papel/95 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-4 sm:px-6">
        <button type="button" data-abrir="menu-mobile" class="-ml-2 p-2 lg:hidden" aria-label="Abrir menu">${ICONES.menu}</button>

        <a href="index.html" class="font-serif text-2xl font-bold tracking-tight" aria-label="Entrelinhas, página inicial">
          Entre<em class="text-vinho">linhas</em>
        </a>

        <nav aria-label="Principal" class="hidden h-full lg:block">
          <ul class="flex h-full items-center gap-8 text-[13px] font-medium uppercase tracking-[0.14em]">
            <li class="group flex h-full items-center">
              <a href="produtos.html" class="flex h-full items-center gap-1 border-b-2 border-transparent group-hover:border-vinho ${ativo('produtos')}" aria-haspopup="true">
                Loja <span class="text-[10px] transition group-hover:rotate-180">▾</span>
              </a>
              <div class="invisible absolute inset-x-0 top-full border-b border-linha bg-papel opacity-0 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.25)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div class="mx-auto grid max-w-site grid-cols-4 gap-8 px-6 py-10 normal-case tracking-normal">
                  <div>
                    <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">Roupas</p>
                    <ul class="space-y-2.5">${listaLinks(LINKS_ROUPAS)}</ul>
                    <a href="produtos.html?categoria=roupas" class="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-vinho">Ver tudo ${ICONES.seta}</a>
                  </div>
                  <div>
                    <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">Acessórios</p>
                    <ul class="space-y-2.5">${listaLinks(LINKS_ACESSORIOS)}</ul>
                    <a href="produtos.html?categoria=acessorios" class="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-vinho">Ver tudo ${ICONES.seta}</a>
                  </div>
                  <div>
                    <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">Coleções</p>
                    <ul class="space-y-2.5">${listaLinks(LINKS_COLECOES)}</ul>
                    <a href="produtos.html?ordem=novidades" class="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-vinho hover:underline">Novidades ${ICONES.seta}</a>
                  </div>
                  <a href="produtos.html?colecao=classicos-brasileiros" class="group/card flex gap-4 bg-papel-escuro p-4">
                    <div class="mockup w-28 shrink-0" data-mockup="ao-vencedor-as-batatas"></div>
                    <div class="flex flex-col justify-center">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-vinho">Coleção</p>
                      <p class="mt-1 font-serif text-xl leading-tight">Clássicos brasileiros</p>
                      <p class="mt-2 text-xs text-grafite">Machado, Mário e Drummond no guarda-roupa.</p>
                    </div>
                  </a>
                </div>
                <div class="border-t border-linha">
                  <ul class="mx-auto flex max-w-site justify-center gap-12 px-6 py-4 text-xs normal-case tracking-normal text-grafite">
                    <li><strong class="text-tinta">Marca-páginas de brinde</strong> em todo pedido</li>
                    <li><strong class="text-tinta">Primeira troca grátis</strong> em até 30 dias</li>
                    <li><strong class="text-tinta">Atendimento humano</strong> pelo WhatsApp</li>
                  </ul>
                </div>
              </div>
            </li>
            <li><a href="produtos.html?ordem=novidades" class="hover:text-vinho">Novidades</a></li>
            <li><a href="produtos.html?colecao=classicos-brasileiros" class="hover:text-vinho">Clássicos BR</a></li>
            <li><a href="sobre.html" class="${ativo('sobre')}">Sobre</a></li>
            <li><a href="contato.html" class="${ativo('contato')}">Contato</a></li>
          </ul>
        </nav>

        <div class="-mr-2 flex items-center">
          <button type="button" id="botao-busca" class="p-2 hover:text-vinho" aria-label="Buscar" aria-expanded="false" aria-controls="painel-busca">${ICONES.busca}</button>
          <button type="button" data-abrir="carrinho" class="relative p-2 hover:text-vinho" aria-label="Abrir carrinho">
            ${ICONES.sacola}
            <span data-contador-carrinho hidden class="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-vinho px-1 text-[10px] font-semibold text-papel">0</span>
          </button>
        </div>
      </div>

      <div id="painel-busca" hidden class="border-t border-linha bg-papel">
        <form action="produtos.html" method="get" role="search" class="mx-auto flex max-w-site items-center gap-3 px-4 py-4 sm:px-6">
          <span class="text-grafite">${ICONES.busca}</span>
          <input type="search" name="busca" placeholder="Busque por título, autor ou frase… ex.: Machado, capítulo, moletom"
            class="w-full bg-transparent py-2 font-serif text-lg placeholder:text-grafite/70 focus:outline-none" aria-label="Buscar produtos">
          <button type="submit" class="shrink-0 bg-tinta px-5 py-2 text-xs font-medium uppercase tracking-widest text-papel hover:bg-vinho">Buscar</button>
        </form>
      </div>
    </header>`;
}

function htmlGavetas() {
  const secaoMobile = (titulo, links) => `
    <details class="border-b border-linha py-4">
      <summary class="flex cursor-pointer items-center justify-between font-serif text-2xl">${titulo}<span class="seta-details text-xl transition-transform">+</span></summary>
      <ul class="mt-3 space-y-3 pl-1">${listaLinks(links)}</ul>
    </details>`;

  return `
    <div id="sobreposicao" class="sobreposicao pointer-events-none fixed inset-0 z-50 bg-tinta/50 opacity-0" aria-hidden="true"></div>

    <aside id="menu-mobile" class="gaveta gaveta-esquerda fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col bg-papel" aria-hidden="true" aria-label="Menu" role="dialog" aria-modal="true" inert>
      <div class="flex h-16 items-center justify-between border-b border-linha px-4">
        <span class="font-serif text-2xl font-bold">Entre<em class="text-vinho">linhas</em></span>
        <button type="button" data-fechar class="p-2" aria-label="Fechar menu">${ICONES.fechar}</button>
      </div>
      <nav class="flex-1 overflow-y-auto px-4 pb-8" aria-label="Menu mobile">
        <a href="produtos.html" class="block border-b border-linha py-4 font-serif text-2xl">Toda a estante</a>
        ${secaoMobile('Roupas', LINKS_ROUPAS)}
        ${secaoMobile('Acessórios', LINKS_ACESSORIOS)}
        ${secaoMobile('Coleções', LINKS_COLECOES)}
        <a href="produtos.html?ordem=novidades" class="block border-b border-linha py-4 font-serif text-2xl">Novidades</a>
        <a href="sobre.html" class="block border-b border-linha py-4 font-serif text-2xl">Sobre</a>
        <a href="contato.html" class="block border-b border-linha py-4 font-serif text-2xl">Contato</a>
        <div class="mt-8 flex gap-4 text-grafite">
          <a href="${LOJA.instagram}" target="_blank" rel="noopener" aria-label="Instagram" class="hover:text-vinho">${ICONES.instagram}</a>
          <a href="${LOJA.tiktok}" target="_blank" rel="noopener" aria-label="TikTok" class="hover:text-vinho">${ICONES.tiktok}</a>
          <a href="https://wa.me/${LOJA.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" class="hover:text-vinho">${ICONES.whatsapp}</a>
        </div>
      </nav>
    </aside>

    <aside id="carrinho" class="gaveta gaveta-direita fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-papel" aria-hidden="true" aria-labelledby="carrinho-titulo" role="dialog" aria-modal="true" inert>
      <div class="flex h-16 shrink-0 items-center justify-between border-b border-linha px-5">
        <h2 id="carrinho-titulo" class="font-serif text-2xl">Carrinho <span id="carrinho-titulo-qtd" class="text-base text-grafite"></span></h2>
        <button type="button" data-fechar class="-mr-2 p-2" aria-label="Fechar carrinho">${ICONES.fechar}</button>
      </div>
      <ul id="carrinho-lista" class="flex-1 divide-y divide-linha overflow-y-auto px-5"></ul>
      <div id="carrinho-rodape" class="shrink-0 border-t border-linha bg-papel-escuro/60 px-5 py-5" hidden></div>
    </aside>`;
}

function htmlRodape() {
  const ano = new Date().getFullYear();
  return `
    <footer class="mt-24 bg-tinta text-papel">
      <div class="mx-auto grid max-w-site gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <a href="index.html" class="font-serif text-3xl font-bold">Entre<em class="text-[#C8505F]">linhas</em></a>
          <p class="mt-4 max-w-xs font-serif text-lg italic text-papel/80">Roupas para quem lê até o que não está escrito.</p>
          <div class="mt-6 flex gap-4 text-papel/70">
            <a href="${LOJA.instagram}" target="_blank" rel="noopener" aria-label="Instagram" class="hover:text-papel">${ICONES.instagram}</a>
            <a href="${LOJA.tiktok}" target="_blank" rel="noopener" aria-label="TikTok" class="hover:text-papel">${ICONES.tiktok}</a>
            <a href="https://wa.me/${LOJA.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" class="hover:text-papel">${ICONES.whatsapp}</a>
          </div>
        </div>
        <div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-papel/50">Loja</p>
          <ul class="space-y-2.5 text-sm text-papel/80">
            <li><a href="produtos.html" class="hover:text-papel">Toda a estante</a></li>
            <li><a href="produtos.html?categoria=roupas" class="hover:text-papel">Roupas</a></li>
            <li><a href="produtos.html?categoria=acessorios" class="hover:text-papel">Acessórios</a></li>
            <li><a href="produtos.html?ordem=novidades" class="hover:text-papel">Novidades</a></li>
          </ul>
        </div>
        <div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-papel/50">Coleções</p>
          <ul class="space-y-2.5 text-sm text-papel/80">
            ${LINKS_COLECOES.map(([href, nome]) => `<li><a href="${href}" class="hover:text-papel">${nome}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-papel/50">Institucional</p>
          <ul class="space-y-2.5 text-sm text-papel/80">
            <li><a href="sobre.html" class="hover:text-papel">Sobre a Entrelinhas</a></li>
            <li><a href="contato.html" class="hover:text-papel">Contato</a></li>
            <li><a href="contato.html#duvidas" class="hover:text-papel">Dúvidas frequentes</a></li>
            <li><span class="text-papel/60">${LOJA.email}</span></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-papel/10">
        <div class="mx-auto flex max-w-site flex-col gap-2 px-4 py-6 text-xs text-papel/50 sm:flex-row sm:justify-between sm:px-6">
          <p>© ${ano} Entrelinhas. Vista-se de histórias.</p>
          <p>Projeto acadêmico · Nenhum livro foi dobrado na produção deste site.</p>
        </div>
      </div>
    </footer>`;
}

/* --------------------------------------------------------------------------
   Gavetas (menu mobile e carrinho)
   -------------------------------------------------------------------------- */

let elementoAnterior = null;

function abrirGaveta(id) {
  const gaveta = document.getElementById(id);
  const sobreposicao = document.getElementById('sobreposicao');
  if (!gaveta) return;

  fecharGavetas(false);
  elementoAnterior = document.activeElement;
  gaveta.setAttribute('aria-hidden', 'false');
  gaveta.inert = false;
  sobreposicao.classList.remove('pointer-events-none', 'opacity-0');
  document.body.classList.add('overflow-hidden');
  gaveta.querySelector('[data-fechar]')?.focus();
}

function fecharGavetas(devolverFoco = true) {
  document.querySelectorAll('.gaveta').forEach((g) => {
    g.setAttribute('aria-hidden', 'true');
    g.inert = true;
  });
  document.getElementById('sobreposicao')?.classList.add('pointer-events-none', 'opacity-0');
  document.body.classList.remove('overflow-hidden');
  if (devolverFoco && elementoAnterior) {
    elementoAnterior.focus?.();
    elementoAnterior = null;
  }
}

function montarLayout() {
  const pagina = document.body.dataset.pagina;

  document.getElementById('cabecalho')?.insertAdjacentHTML('afterend', htmlCabecalho(pagina));
  document.getElementById('cabecalho')?.remove();

  document.getElementById('rodape')?.insertAdjacentHTML('afterend', htmlRodape());
  document.getElementById('rodape')?.remove();

  document.body.insertAdjacentHTML('beforeend', htmlGavetas());

  // Abrir / fechar gavetas
  document.addEventListener('click', (e) => {
    const abrir = e.target.closest('[data-abrir]');
    if (abrir) abrirGaveta(abrir.dataset.abrir);
    if (e.target.closest('[data-fechar]') || e.target.id === 'sobreposicao') fecharGavetas();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharGavetas();
      fecharBusca();
    }
  });

  // Painel de busca
  const botaoBusca = document.getElementById('botao-busca');
  botaoBusca.addEventListener('click', () => {
    const painel = document.getElementById('painel-busca');
    painel.hidden = !painel.hidden;
    botaoBusca.setAttribute('aria-expanded', String(!painel.hidden));
    if (!painel.hidden) painel.querySelector('input').focus();
  });
}

function fecharBusca() {
  const painel = document.getElementById('painel-busca');
  if (painel && !painel.hidden) {
    painel.hidden = true;
    document.getElementById('botao-busca').setAttribute('aria-expanded', 'false');
  }
}

// Qualquer elemento com data-mockup="id-do-produto" recebe o desenho do produto
function preencherMockups() {
  document.querySelectorAll('[data-mockup]').forEach((el) => {
    const produto = buscarProduto(el.dataset.mockup);
    if (produto) el.innerHTML = mockupSVG(produto, el.dataset.mockupRotulo !== 'nao');
  });
}

/* --------------------------------------------------------------------------
   Página inicial
   -------------------------------------------------------------------------- */

function iniciarHome() {
  const destaques = document.getElementById('destaques');
  if (destaques) {
    destaques.innerHTML = PRODUTOS.filter((p) => p.destaque).slice(0, 4).map(cardProduto).join('');
  }

  const novidades = document.getElementById('novidades');
  if (novidades) {
    novidades.innerHTML = PRODUTOS.filter((p) => p.novo).slice(0, 4).map(cardProduto).join('');
  }

  iniciarEnquete();
}

// Enquete "qual a próxima estampa?" — o voto fica salvo neste navegador.
const ENQUETE = {
  chave: 'entrelinhas:enquete',
  opcoes: [
    { id: 'sertao', texto: 'O sertão é do tamanho do mundo', autor: 'Guimarães Rosa', votos: 128 },
    { id: 'macabea', texto: 'Macabéa merecia mais', autor: 'Clarice Lispector', votos: 164 },
    { id: 'palmeiras', texto: 'Minha terra tem palmeiras', autor: 'Gonçalves Dias', votos: 91 },
    { id: 'bras-cubas', texto: 'Ao verme que primeiro roeu', autor: 'Machado de Assis', votos: 143 },
  ],
};

function iniciarEnquete() {
  const alvo = document.getElementById('enquete');
  if (!alvo) return;

  let voto = null;
  try {
    voto = localStorage.getItem(ENQUETE.chave);
  } catch {
    // sem localStorage: a enquete funciona apenas nesta visita
  }

  function render() {
    if (!voto) {
      alvo.innerHTML = `
        <form class="space-y-3">
          ${ENQUETE.opcoes.map((o) => `
            <label class="flex cursor-pointer items-center gap-4 border border-papel/20 p-4 transition hover:border-papel has-[:checked]:border-papel has-[:checked]:bg-papel/10">
              <input type="radio" name="voto" value="${o.id}" class="h-4 w-4 accent-[#C8505F]" required>
              <span>
                <span class="block font-serif text-lg">“${o.texto}”</span>
                <span class="text-xs uppercase tracking-widest text-papel/60">${o.autor}</span>
              </span>
            </label>`).join('')}
          <button type="submit" class="mt-2 w-full bg-papel px-6 py-4 text-sm font-medium uppercase tracking-widest text-tinta transition hover:bg-white sm:w-auto">Votar</button>
        </form>`;

      alvo.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const escolhido = new FormData(e.target).get('voto');
        if (!escolhido) return;
        voto = escolhido;
        try {
          localStorage.setItem(ENQUETE.chave, voto);
        } catch {}
        render();
      });
      return;
    }

    const opcoes = ENQUETE.opcoes.map((o) => ({ ...o, votos: o.votos + (o.id === voto ? 1 : 0) }));
    const totalVotos = opcoes.reduce((soma, o) => soma + o.votos, 0);

    alvo.innerHTML = `
      <ul class="space-y-5">
        ${opcoes.map((o) => {
          const pct = Math.round((o.votos / totalVotos) * 100);
          return `
            <li>
              <div class="flex items-baseline justify-between gap-4">
                <span class="font-serif text-lg">“${o.texto}” ${o.id === voto ? '<span class="ml-1 text-xs font-sans uppercase tracking-widest text-[#E08A95]">seu voto</span>' : ''}</span>
                <span class="text-sm tabular-nums text-papel/70">${pct}%</span>
              </div>
              <div class="mt-2 h-1.5 bg-papel/15"><div class="h-1.5 ${o.id === voto ? 'bg-[#C8505F]' : 'bg-papel/60'}" style="width:${pct}%"></div></div>
            </li>`;
        }).join('')}
      </ul>
      <p class="mt-6 text-sm text-papel/60">Obrigado pelo voto! ${totalVotos} leitores já participaram. A estampa vencedora entra na próxima coleção.</p>`;
  }

  render();
}

/* --------------------------------------------------------------------------
   Contato: o formulário monta uma mensagem e abre o WhatsApp
   -------------------------------------------------------------------------- */

function iniciarContato() {
  document.querySelectorAll('[data-whatsapp-texto]').forEach((el) => (el.textContent = LOJA.whatsappExibicao));
  document.querySelectorAll('[data-email-texto]').forEach((el) => (el.textContent = LOJA.email));
  document.querySelectorAll('[data-whatsapp-link]').forEach((el) => (el.href = `https://wa.me/${LOJA.whatsapp}`));

  const form = document.getElementById('form-contato');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const dados = new FormData(form);
    const mensagem = [
      `Olá! Meu nome é ${dados.get('nome').trim()}.`,
      `Assunto: ${dados.get('assunto')}`,
      '',
      dados.get('mensagem').trim(),
    ].join('\n');

    window.open(linkWhatsApp(mensagem), '_blank', 'noopener');
    document.getElementById('contato-enviado').hidden = false;
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  montarLayout();
  preencherMockups();
  Carrinho.iniciar();

  switch (document.body.dataset.pagina) {
    case 'inicio': iniciarHome(); break;
    case 'produtos': iniciarCatalogo(); break;
    case 'produto': iniciarPaginaProduto(); break;
    case 'contato': iniciarContato(); break;
  }
});
