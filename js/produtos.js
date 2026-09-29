/* ==========================================================================
   Entrelinhas — catálogo de produtos
   Para adicionar um produto, basta incluir um novo objeto em PRODUTOS.
   ========================================================================== */

const CATEGORIAS = {
  camisetas:      { nome: 'Camisetas',     singular: 'Camiseta',     grupo: 'roupas' },
  moletons:       { nome: 'Moletons',      singular: 'Moletom',      grupo: 'roupas' },
  croppeds:       { nome: 'Croppeds',      singular: 'Cropped',      grupo: 'roupas' },
  bones:          { nome: 'Bonés',         singular: 'Boné',         grupo: 'acessorios' },
  ecobags:        { nome: 'Ecobags',       singular: 'Ecobag',       grupo: 'acessorios' },
  canecas:        { nome: 'Canecas',       singular: 'Caneca',       grupo: 'acessorios' },
  posters:        { nome: 'Pôsteres',      singular: 'Pôster',       grupo: 'acessorios' },
  'marca-paginas': { nome: 'Marca-páginas', singular: 'Kit marca-páginas', grupo: 'acessorios' },
};

const GRUPOS = {
  roupas:     { nome: 'Roupas' },
  acessorios: { nome: 'Acessórios' },
};

const COLECOES = {
  'classicos-brasileiros': {
    nome: 'Clássicos brasileiros',
    descricao: 'Machado, Mário, Drummond e companhia, direto da estante para o guarda-roupa.',
  },
  metalinguagem: {
    nome: 'Metalinguagem',
    descricao: 'Estampas que sabem que são estampas. Figuras de linguagem, plot twists e notas de rodapé.',
  },
  'vida-de-leitor': {
    nome: 'Vida de leitor',
    descricao: 'Para quem já disse "só mais um capítulo" às duas da manhã.',
  },
};

const TAMANHOS = {
  roupa:     ['P', 'M', 'G', 'GG'],
  oversized: ['P', 'M', 'G', 'GG', 'XG'],
  cropped:   ['P', 'M', 'G'],
  poster:    ['A4', 'A3'],
  unico:     ['Único'],
};

const DETALHES = {
  camisetas: '100% algodão penteado fio 30.1, gola careca com ribana e estampa em silk à base d\'água.',
  moletons:  'Moletom flanelado 50% algodão e 50% poliéster, capuz forrado, bolso canguru e punhos com ribana.',
  croppeds:  'Malha 100% algodão com modelagem cropped levemente ajustada e estampa em silk.',
  bones:     'Boné dad hat em sarja 100% algodão, aba curva e regulagem com fivela metálica.',
  ecobags:   'Lona crua 100% algodão, 38 × 42 cm, alças reforçadas que aguentam uma trilogia inteira.',
  canecas:   'Cerâmica branca de 325 ml, pode ir ao micro-ondas e à lava-louças.',
  posters:   'Impressão em papel couché fosco 250 g. A moldura não acompanha o produto.',
  'marca-paginas': 'Kit com 3 marca-páginas em papel 300 g com laminação fosca e cordão de algodão.',
};

// Tipos de mockup: camiseta | moletom | cropped | bone | ecobag | caneca | poster | marcapagina
const PRODUTOS = [
  {
    id: 'nao-era-uma-metafora',
    nome: 'Não era uma metáfora',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'metalinguagem',
    preco: 89.9,
    cor: '#171717', corNome: 'Preto',
    estampa: { linhas: ['Não era', 'uma metáfora.'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Para quando todo mundo procura significado escondido e você só estava falando do que estava falando mesmo.',
    destaque: true,
  },
  {
    id: 'so-mais-um-capitulo',
    nome: 'Só mais um capítulo',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'vida-de-leitor',
    preco: 89.9,
    cor: '#FBF8F1', corNome: 'Off-white',
    estampa: { linhas: ['Só mais', 'um capítulo.'], cor: '#171717' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'A maior mentira que um leitor conta para si mesmo, agora em algodão. Ideal para usar às 2h da manhã.',
    destaque: true,
  },
  {
    id: 'plot-twist',
    nome: 'Plot Twist',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'metalinguagem',
    preco: 99.9,
    cor: '#8F1D2C', corNome: 'Vinho',
    estampa: { linhas: ['PLOT', 'TWIST.'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.oversized,
    descricao: 'Modelagem oversized, porque ninguém esperava. A reviravolta que o seu guarda-roupa pedia.',
    novo: true,
    destaque: true,
  },
  {
    id: 'leio-logo-existo',
    nome: 'Leio, logo existo',
    categoria: 'croppeds',
    mockup: 'cropped',
    colecao: 'vida-de-leitor',
    preco: 79.9,
    cor: '#FBF8F1', corNome: 'Off-white',
    estampa: { linhas: ['Leio,', 'logo existo.'], cor: '#8F1D2C' },
    tamanhos: TAMANHOS.cropped,
    descricao: 'Descartes que nos perdoe, mas a versão correta é essa. Cropped leve para quem pensa (e lê) muito.',
    referencia: 'Paródia de "Penso, logo existo", de René Descartes.',
  },
  {
    id: 'livros-antes-dos-boletos',
    nome: 'Livros antes dos boletos',
    categoria: 'ecobags',
    mockup: 'ecobag',
    colecao: 'vida-de-leitor',
    preco: 59.9,
    cor: '#E2D6BE', corNome: 'Lona crua',
    estampa: { linhas: ['Livros', 'antes dos', 'boletos.'], cor: '#171717' },
    tamanhos: TAMANHOS.unico,
    descricao: 'Uma questão de prioridades. Cabe todos os livros que você comprou "sem querer" na última feira.',
    destaque: true,
  },
  {
    id: 'final-feliz-nao-encontrado',
    nome: '404: Final feliz não encontrado',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'metalinguagem',
    preco: 89.9,
    cor: '#171717', corNome: 'Preto',
    estampa: { linhas: ['Erro 404:', 'final feliz', 'não', 'encontrado.'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Para leitores de romances trágicos e programadores que leem romances trágicos.',
  },
  {
    id: 'ao-vencedor-as-batatas',
    nome: 'Ao vencedor, as batatas!',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'classicos-brasileiros',
    preco: 89.9,
    cor: '#3A4636', corNome: 'Verde musgo',
    estampa: { linhas: ['Ao vencedor,', 'as batatas!'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'A filosofia do Humanitismo, de Quincas Borba, resumida em uma frase e estampada no peito.',
    referencia: 'Machado de Assis, "Quincas Borba" (1891).',
    destaque: true,
  },
  {
    id: 'olhos-de-ressaca',
    nome: 'Olhos de ressaca',
    categoria: 'croppeds',
    mockup: 'cropped',
    colecao: 'classicos-brasileiros',
    preco: 79.9,
    cor: '#171717', corNome: 'Preto',
    estampa: { linhas: ['Olhos de', 'ressaca.'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.cropped,
    descricao: 'Olhos de cigana oblíqua e dissimulada. Se traiu ou não, a gente deixa a discussão para o clube do livro.',
    referencia: 'Machado de Assis, "Dom Casmurro" (1899).',
  },
  {
    id: 'ai-que-preguica',
    nome: 'Ai, que preguiça!',
    categoria: 'moletons',
    mockup: 'moletom',
    colecao: 'classicos-brasileiros',
    preco: 189.9,
    cor: '#4A4540', corNome: 'Grafite',
    estampa: { linhas: ['Ai, que', 'preguiça!'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'O bordão do herói sem nenhum caráter virou o moletom mais confortável da estante. Domingo agradece.',
    referencia: 'Mário de Andrade, "Macunaíma" (1928).',
    destaque: true,
  },
  {
    id: 'pedra-no-meio-do-caminho',
    nome: 'No meio do caminho',
    categoria: 'canecas',
    mockup: 'caneca',
    colecao: 'classicos-brasileiros',
    preco: 49.9,
    cor: '#FBF8F1', corNome: 'Branca',
    estampa: { linhas: ['No meio', 'do caminho', 'tinha uma', 'pedra.'], cor: '#171717' },
    tamanhos: TAMANHOS.unico,
    descricao: 'Para o café de segunda-feira, quando a pedra no meio do caminho é a própria segunda-feira.',
    referencia: 'Carlos Drummond de Andrade, "No meio do caminho" (1928).',
  },
  {
    id: 'e-agora-jose',
    nome: 'E agora, José?',
    categoria: 'bones',
    mockup: 'bone',
    colecao: 'classicos-brasileiros',
    preco: 69.9,
    cor: '#8F1D2C', corNome: 'Vinho',
    estampa: { linhas: ['E agora,', 'José?'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.unico,
    descricao: 'A festa acabou, a luz apagou, o povo sumiu, mas o boné continua lindo.',
    referencia: 'Carlos Drummond de Andrade, "José" (1942).',
    novo: true,
  },
  {
    id: 'vivendo-em-outra-historia',
    nome: 'Vivendo em outra história',
    categoria: 'moletons',
    mockup: 'moletom',
    colecao: 'vida-de-leitor',
    preco: 189.9,
    cor: '#8F1D2C', corNome: 'Vinho',
    estampa: { linhas: ['Vivendo em', 'outra', 'história.'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.roupa,
    descricao: 'Fisicamente presente, mentalmente em outro universo ficcional. Capuz incluso para fingir que não ouviu.',
    novo: true,
  },
  {
    id: 'abandonar-livro-nao-e-crime',
    nome: 'Abandonar livro não é crime',
    categoria: 'posters',
    mockup: 'poster',
    colecao: 'vida-de-leitor',
    preco: 39.9,
    cor: '#F5F2EA', corNome: 'Papel',
    estampa: { linhas: ['Abandonar', 'livro', 'não é', 'crime.'], cor: '#171717' },
    tamanhos: TAMANHOS.poster,
    descricao: 'Um lembrete oficial, para pendurar ao lado da estante, de que a vida é curta demais para livro chato.',
  },
  {
    id: 'eu-parei-aqui',
    nome: 'Eu parei aqui',
    categoria: 'marca-paginas',
    mockup: 'marcapagina',
    colecao: 'vida-de-leitor',
    preco: 19.9,
    cor: '#F5F2EA', corNome: 'Sortidas',
    estampa: { linhas: ['Eu parei aqui.'], cor: '#171717' },
    tamanhos: TAMANHOS.unico,
    descricao: 'Kit com três marca-páginas para você nunca mais dobrar a orelha do livro. A gente está vendo.',
  },
  {
    id: 'nota-de-rodape-ambulante',
    nome: 'Nota de rodapé ambulante',
    categoria: 'camisetas',
    mockup: 'camiseta',
    colecao: 'metalinguagem',
    preco: 89.9,
    cor: '#D8C9AC', corNome: 'Areia',
    estampa: { linhas: ['Nota de rodapé', 'ambulante*'], cor: '#171717' },
    tamanhos: TAMANHOS.roupa,
    descricao: '*Para quem sempre tem um comentário a mais, uma referência extra e um "na verdade, no livro...".',
  },
  {
    id: 'capitu-traiu',
    nome: 'Capitu traiu?',
    categoria: 'ecobags',
    mockup: 'ecobag',
    colecao: 'classicos-brasileiros',
    preco: 59.9,
    cor: '#171717', corNome: 'Preta',
    estampa: { linhas: ['Capitu', 'traiu?'], cor: '#F5F2EA' },
    tamanhos: TAMANHOS.unico,
    descricao: 'A pergunta que divide o Brasil desde 1899. Carregue o debate para onde for.',
    referencia: 'Machado de Assis, "Dom Casmurro" (1899).',
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
  return CATEGORIAS[produto.categoria]?.singular ?? '';
}

/* --------------------------------------------------------------------------
   Mockups em SVG
   Cada produto é desenhado com a sua cor e a frase da estampa.
   -------------------------------------------------------------------------- */

const SOMBRA = 'rgba(0,0,0,0.14)';

// Escreve as linhas da estampa centralizadas em (cx, cy), cabendo em "largura".
function textoEstampa(linhas, { cx, cy, largura, maxFonte, cor, italico = false, transform = '' }) {
  const maiorLinha = Math.max(...linhas.map((l) => l.length));
  const fonte = Math.min(maxFonte, largura / (maiorLinha * 0.56));
  const entrelinha = fonte * 1.12;
  const inicio = cy - ((linhas.length - 1) * entrelinha) / 2;

  const tspans = linhas
    .map((linha, i) => `<tspan x="${cx}" y="${(inicio + i * entrelinha).toFixed(1)}">${escaparHTML(linha)}</tspan>`)
    .join('');

  return `<text text-anchor="middle" dominant-baseline="middle" font-family="'Playfair Display', Georgia, serif"
    font-weight="700" ${italico ? 'font-style="italic"' : ''} font-size="${fonte.toFixed(1)}" fill="${cor}"
    ${transform ? `transform="${transform}"` : ''}>${tspans}</text>`;
}

const DESENHOS = {
  camiseta(p) {
    const corpo = 'M150 88 L112 100 L58 142 L86 196 L118 180 L118 410 L282 410 L282 180 L314 196 L342 142 L288 100 L250 88 C240 114 160 114 150 88 Z';
    return `
      <path d="${corpo}" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M150 88 C160 114 240 114 250 88" fill="none" stroke="${SOMBRA}" stroke-width="6"/>
      <path d="M118 180 C121 150 118 122 112 100 M282 180 C279 150 282 122 288 100" fill="none" stroke="${SOMBRA}" stroke-width="2"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 245, largura: 150, maxFonte: 30, cor: p.estampa.cor })}`;
  },

  cropped(p) {
    const corpo = 'M156 92 L118 104 L72 140 L96 184 L126 170 L128 318 L272 318 L274 170 L304 184 L328 140 L282 104 L244 92 C235 116 165 116 156 92 Z';
    return `
      <path d="${corpo}" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M156 92 C165 116 235 116 244 92" fill="none" stroke="${SOMBRA}" stroke-width="6"/>
      <path d="M126 170 C128 145 125 120 118 104 M274 170 C272 145 275 120 282 104" fill="none" stroke="${SOMBRA}" stroke-width="2"/>
      <path d="M128 306 L272 306" stroke="${SOMBRA}" stroke-width="2"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 212, largura: 120, maxFonte: 26, cor: p.estampa.cor })}`;
  },

  moletom(p) {
    const corpo = 'M148 100 L104 116 L74 180 L56 386 L96 392 L120 222 L120 412 L280 412 L280 222 L304 392 L344 386 L326 180 L296 116 L252 100 Z';
    return `
      <path d="${corpo}" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M148 100 C140 58 170 40 200 40 C230 40 260 58 252 100 C240 130 160 130 148 100 Z" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      <path d="M148 100 C140 58 170 40 200 40 C230 40 260 58 252 100 C240 130 160 130 148 100 Z" fill="${SOMBRA}"/>
      <path d="M164 100 C172 76 228 76 236 100 C226 118 174 118 164 100 Z" fill="rgba(0,0,0,0.28)"/>
      <path d="M190 120 L187 170 M210 120 L213 170" stroke="${p.estampa.cor}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <path d="M150 322 L250 322 L268 374 L132 374 Z" fill="none" stroke="${SOMBRA}" stroke-width="2.5"/>
      <rect x="120" y="398" width="160" height="14" fill="${SOMBRA}"/>
      <path d="M56 372 L96 378 M344 372 L304 378" stroke="${SOMBRA}" stroke-width="10"/>
      <path d="M120 222 C122 180 116 140 104 116 M280 222 C278 180 284 140 296 116" fill="none" stroke="${SOMBRA}" stroke-width="2"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 248, largura: 128, maxFonte: 28, cor: p.estampa.cor })}`;
  },

  bone(p) {
    return `
      <path d="M104 292 C104 190 150 150 200 150 C250 150 296 190 296 292 Z" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      <path d="M200 150 C166 180 156 236 154 292 M200 150 C234 180 244 236 246 292" fill="none" stroke="${SOMBRA}" stroke-width="2"/>
      <path d="M92 290 C150 274 250 274 308 290 C302 334 98 334 92 290 Z" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      <path d="M92 290 C150 274 250 274 308 290 C302 334 98 334 92 290 Z" fill="${SOMBRA}"/>
      <circle cx="200" cy="151" r="7" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 236, largura: 84, maxFonte: 22, cor: p.estampa.cor, italico: true })}`;
  },

  ecobag(p) {
    return `
      <path d="M156 182 C156 88 244 88 244 182" fill="none" stroke="${p.cor}" stroke-width="13"/>
      <path d="M156 182 C156 88 244 88 244 182" fill="none" stroke="${SOMBRA}" stroke-width="13"/>
      <path d="M112 176 L288 176 L298 414 L102 414 Z" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M113 192 L287 192" stroke="${SOMBRA}" stroke-width="2" stroke-dasharray="5 5"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 300, largura: 150, maxFonte: 34, cor: p.estampa.cor })}`;
  },

  caneca(p) {
    return `
      <path d="M274 212 C334 212 334 330 274 330" fill="none" stroke="${p.cor}" stroke-width="20"/>
      <path d="M274 212 C334 212 334 330 274 330" fill="none" stroke="${SOMBRA}" stroke-width="20" opacity="0.5"/>
      <path d="M118 180 L282 180 L282 382 C282 398 270 406 254 406 L146 406 C130 406 118 398 118 382 Z" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      <ellipse cx="200" cy="180" rx="82" ry="14" fill="${p.cor}" stroke="${SOMBRA}" stroke-width="2"/>
      <ellipse cx="200" cy="181" rx="70" ry="9" fill="#3B2419"/>
      <path d="M132 200 L132 380" stroke="rgba(0,0,0,0.05)" stroke-width="10" stroke-linecap="round"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 292, largura: 140, maxFonte: 26, cor: p.estampa.cor, italico: true })}`;
  },

  poster(p) {
    return `
      <path d="M200 52 L112 86 M200 52 L288 86" stroke="#5C5750" stroke-width="1.5"/>
      <circle cx="200" cy="50" r="5" fill="#5C5750"/>
      <rect x="104" y="84" width="192" height="262" fill="rgba(0,0,0,0.12)" transform="translate(6 8)"/>
      <rect x="104" y="84" width="192" height="262" fill="#171717"/>
      <rect x="114" y="94" width="172" height="242" fill="${p.cor}"/>
      <line x1="134" y1="118" x2="266" y2="118" stroke="#8F1D2C" stroke-width="2"/>
      ${textoEstampa(p.estampa.linhas, { cx: 200, cy: 212, largura: 140, maxFonte: 34, cor: p.estampa.cor })}
      <text x="200" y="316" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" letter-spacing="3" fill="#5C5750">ENTRELINHAS</text>`;
  },

  marcapagina(p) {
    const marca = (cor, rot, texto, corTexto) => `
      <g transform="rotate(${rot} 200 400)">
        <rect x="168" y="80" width="64" height="300" rx="4" fill="${cor}" stroke="${SOMBRA}" stroke-width="2"/>
        <circle cx="200" cy="104" r="6" fill="#EAE4D6" stroke="${SOMBRA}" stroke-width="1.5"/>
        ${texto ? textoEstampa([texto], { cx: 200, cy: 250, largura: 220, maxFonte: 24, cor: corTexto, transform: 'rotate(-90 200 250)' }) : ''}
      </g>`;
    return `
      ${marca('#171717', -16, 'Plot twist.', '#F5F2EA')}
      ${marca('#8F1D2C', 14, 'Só mais um.', '#F5F2EA')}
      ${marca(p.cor, 0, p.estampa.linhas[0], p.estampa.cor)}
      <path d="M200 104 C216 70 186 54 204 24" fill="none" stroke="#8F1D2C" stroke-width="3" stroke-linecap="round"/>`;
  },
};

function mockupSVG(produto, rotulo = true) {
  const desenho = DESENHOS[produto.mockup] ?? DESENHOS.camiseta;
  const acessivel = rotulo
    ? `role="img" aria-label="${escaparHTML(`${nomeCategoria(produto)} ${produto.nome}, cor ${produto.corNome}`)}"`
    : 'aria-hidden="true"';
  return `<svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" ${acessivel}>
    <ellipse cx="200" cy="436" rx="130" ry="10" fill="rgba(0,0,0,0.07)"/>
    ${desenho(produto)}
  </svg>`;
}

/* --------------------------------------------------------------------------
   Card de produto (usado na home, no catálogo e nos relacionados)
   -------------------------------------------------------------------------- */

function cardProduto(p) {
  const selo = p.novo
    ? '<span class="absolute left-3 top-3 bg-vinho px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-papel">Novo</span>'
    : '';
  return `
    <a href="produto.html?id=${p.id}" class="group block">
      <div class="mockup mockup-zoom relative aspect-[20/23] overflow-hidden bg-papel-escuro">
        ${mockupSVG(p)}
        ${selo}
        <span class="absolute bottom-3 right-3 translate-y-2 bg-tinta px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-papel opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Ver peça</span>
      </div>
      <div class="mt-3 flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-[11px] uppercase tracking-[0.18em] text-grafite">${nomeCategoria(p)}</p>
          <h3 class="mt-0.5 font-serif text-lg leading-snug group-hover:text-vinho">${escaparHTML(p.nome)}</h3>
        </div>
        <p class="whitespace-nowrap pt-4 text-sm font-medium">${formatarPreco(p.preco)}</p>
      </div>
    </a>`;
}

/* --------------------------------------------------------------------------
   Página de catálogo (produtos.html)
   Filtros ficam na URL: ?categoria=&colecao=&busca=&ordem=
   -------------------------------------------------------------------------- */

function filtrarProdutos({ categoria = '', colecao = '', busca = '', ordem = '' }) {
  const termo = normalizar(busca);

  let lista = PRODUTOS.filter((p) => {
    const cat = CATEGORIAS[p.categoria];
    if (categoria && p.categoria !== categoria && cat.grupo !== categoria) return false;
    if (colecao && p.colecao !== colecao) return false;
    if (termo) {
      const alvo = normalizar(
        [p.nome, p.descricao, p.referencia ?? '', cat.nome, cat.singular, COLECOES[p.colecao].nome, p.estampa.linhas.join(' ')].join(' ')
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
    colecao: params.get('colecao') ?? '',
    busca: params.get('busca') ?? '',
    ordem: params.get('ordem') ?? '',
  };

  // Monta os chips de categoria
  const opcoesChips = [['', 'Todos'], ...Object.entries(CATEGORIAS).map(([slug, c]) => [slug, c.nome])];
  chips.innerHTML = opcoesChips
    .map(([slug, nome]) => `<button type="button" data-categoria="${slug}"
      class="chip shrink-0 border px-4 py-2 text-sm transition">${nome}</button>`)
    .join('');

  // Monta o select de coleções
  const selectColecao = form.elements.colecao;
  selectColecao.insertAdjacentHTML(
    'beforeend',
    Object.entries(COLECOES).map(([slug, c]) => `<option value="${slug}">${c.nome}</option>`).join('')
  );

  form.elements.busca.value = estado.busca;
  selectColecao.value = estado.colecao;
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
    if (estado.busca) {
      titulo.textContent = `Resultados para “${estado.busca}”`;
    } else if (estado.colecao && COLECOES[estado.colecao]) {
      titulo.textContent = COLECOES[estado.colecao].nome;
    } else if (estado.categoria) {
      titulo.textContent = CATEGORIAS[estado.categoria]?.nome ?? GRUPOS[estado.categoria]?.nome ?? 'Catálogo';
    } else {
      titulo.textContent = 'Toda a estante';
    }
    subtitulo.textContent = COLECOES[estado.colecao]?.descricao
      ?? 'Camisetas, moletons e acessórios para quem lê até o que não está escrito.';

    contador.textContent = `${lista.length} ${lista.length === 1 ? 'título' : 'títulos'}`;
    grade.innerHTML = lista.map(cardProduto).join('');
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

  selectColecao.addEventListener('change', (e) => {
    estado.colecao = e.target.value;
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
   Página de produto (produto.html?id=...)
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
        <tr><td class="py-2 pr-4">XG</td><td class="py-2 pr-4">62 cm</td><td class="py-2">78 cm</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mt-2 text-xs text-grafite">Medidas aproximadas da peça estendida. Croppeds têm cerca de 20 cm a menos de comprimento.</p>`;

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

  const id = new URLSearchParams(location.search).get('id');
  const p = buscarProduto(id);

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
  const colecao = COLECOES[p.colecao];
  const ehRoupa = categoria.grupo === 'roupas';
  const unico = p.tamanhos.length === 1;

  document.title = `${p.nome} — ${categoria.singular} | Entrelinhas`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', p.descricao);

  const botoesTamanho = p.tamanhos
    .map((t) => `
      <label class="cursor-pointer">
        <input type="radio" name="tamanho" value="${t}" class="peer sr-only" ${unico ? 'checked' : ''}>
        <span class="flex h-11 min-w-11 items-center justify-center border border-linha px-3 text-sm transition peer-checked:border-tinta peer-checked:bg-tinta peer-checked:text-papel peer-focus-visible:ring-2 peer-focus-visible:ring-vinho hover:border-tinta">${t}</span>
      </label>`)
    .join('');

  alvo.innerHTML = `
    <nav aria-label="Trilha" class="mb-6 text-xs uppercase tracking-widest text-grafite">
      <a href="index.html" class="hover:text-vinho">Início</a> <span class="mx-1">/</span>
      <a href="produtos.html?categoria=${p.categoria}" class="hover:text-vinho">${categoria.nome}</a> <span class="mx-1">/</span>
      <span class="text-tinta">${escaparHTML(p.nome)}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="mockup relative aspect-[20/23] bg-papel-escuro pauta-clara lg:sticky lg:top-28 lg:self-start">
        ${mockupSVG(p)}
        ${p.novo ? '<span class="absolute left-4 top-4 bg-vinho px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-papel">Novo</span>' : ''}
      </div>

      <div>
        <a href="produtos.html?colecao=${p.colecao}" class="text-xs font-medium uppercase tracking-[0.25em] text-vinho hover:underline">Coleção ${colecao.nome}</a>
        <h1 class="mt-3 font-serif text-4xl leading-tight sm:text-5xl">${escaparHTML(p.nome)}</h1>
        <p class="mt-2 text-sm text-grafite">${categoria.singular} · ${p.corNome}</p>

        <p class="mt-6 text-2xl font-medium">${formatarPreco(p.preco)}</p>
        <p class="text-sm text-grafite">
          ou ${LOJA.parcelasSemJuros}x de ${formatarPreco(p.preco / LOJA.parcelasSemJuros)} sem juros ·
          <strong class="font-medium text-tinta">${formatarPreco(p.preco * (1 - LOJA.descontoPix))} no Pix</strong>
        </p>

        <p class="mt-6 max-w-prose leading-relaxed">${escaparHTML(p.descricao)}</p>
        ${p.referencia ? `<p class="mt-4 border-l-2 border-vinho pl-4 font-serif italic text-grafite">${escaparHTML(p.referencia)}</p>` : ''}

        <form id="form-produto" class="mt-8 space-y-6" novalidate>
          <fieldset>
            <legend class="mb-3 flex w-full items-center justify-between text-sm font-medium uppercase tracking-widest">
              Tamanho
              ${ehRoupa ? '<a href="#guia-medidas" class="text-xs normal-case tracking-normal text-grafite underline hover:text-vinho">Guia de medidas</a>' : ''}
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
          ${blocoDetalhes('Detalhes da peça', DETALHES[p.categoria], true)}
          ${ehRoupa ? `<div id="guia-medidas">${blocoDetalhes('Guia de medidas', GUIA_MEDIDAS)}</div>` : ''}
          ${blocoDetalhes('Cuidados', 'Lave do avesso, com água fria, e não passe ferro sobre a estampa. Livros e roupas duram mais quando são bem tratados.')}
        </div>
      </div>
    </div>`;

  // Controle de quantidade
  const inputQtd = document.getElementById('quantidade');
  const limitarQtd = (valor) => Math.min(20, Math.max(1, parseInt(valor, 10) || 1));

  alvo.querySelectorAll('[data-qtd]').forEach((botao) =>
    botao.addEventListener('click', () => {
      inputQtd.value = limitarQtd(Number(inputQtd.value) + Number(botao.dataset.qtd));
    })
  );
  inputQtd.addEventListener('change', () => (inputQtd.value = limitarQtd(inputQtd.value)));

  // Seleção de tamanho
  const form = document.getElementById('form-produto');
  const erroTamanho = document.getElementById('erro-tamanho');
  form.addEventListener('change', (e) => {
    if (e.target.name === 'tamanho') erroTamanho.hidden = true;
  });

  function lerEscolha() {
    const tamanho = form.querySelector('[name="tamanho"]:checked')?.value;
    if (!tamanho) {
      erroTamanho.hidden = false;
      form.querySelector('[name="tamanho"]').focus();
      return null;
    }
    return { tamanho, quantidade: limitarQtd(inputQtd.value) };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const escolha = lerEscolha();
    if (!escolha) return;
    Carrinho.adicionar(p.id, escolha.tamanho, escolha.quantidade);
    Carrinho.abrir();
  });

  document.getElementById('comprar-agora').addEventListener('click', () => {
    const escolha = lerEscolha();
    if (!escolha) return;
    Carrinho.adicionar(p.id, escolha.tamanho, escolha.quantidade);
    location.href = 'checkout.html';
  });

  // Produtos relacionados: mesma coleção primeiro, depois o restante
  const relacionados = [
    ...PRODUTOS.filter((r) => r.id !== p.id && r.colecao === p.colecao),
    ...PRODUTOS.filter((r) => r.id !== p.id && r.colecao !== p.colecao),
  ].slice(0, 4);

  document.getElementById('relacionados').innerHTML = relacionados.map(cardProduto).join('');
}
