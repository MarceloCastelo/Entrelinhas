# Entrelinhas

> **Vista-se de histórias.**

A **Entrelinhas** é uma loja de roupas inspiradas em referências literárias, com foco em humor, cultura e identificação entre leitores.

O projeto consiste em um site de apresentação e catálogo de produtos, desenvolvido como uma aplicação **100% frontend**, sem banco de dados ou backend.

---

## 🎯 Objetivo

Criar uma experiência de loja online minimalista, moderna e com identidade editorial, apresentando produtos relacionados à literatura de forma divertida e criativa.

A proposta visual combina elementos de:

* 📚 Literatura
* 👕 Moda
* ✍️ Design editorial
* 😄 Humor
* 🖤 Minimalismo

---

## 🛠️ Tecnologias

O projeto será desenvolvido utilizando:

* **HTML5**
* **Tailwind CSS**
* **JavaScript Vanilla**
* **LocalStorage**
* **Git / GitHub**
* **GitHub Pages**

Não serão utilizados:

* Backend
* Banco de dados
* PHP
* Framework frontend
* API própria

---

## 📁 Estrutura do projeto

```text
entrelinhas/
│
├── index.html
├── produtos.html
├── produto.html
├── sobre.html
├── contato.html
├── 404.html
│
├── assets/
│   ├── img/
│   │   ├── produtos/
│   │   └── banners/
│   │
│   └── icons/
│
├── css/
│   └── style.css
│
└── js/
    ├── main.js
    ├── produtos.js
    └── carrinho.js
```

---

## 🛍️ Funcionalidades

O site deverá possuir:

* Catálogo de produtos
* Página individual dos produtos
* Filtro por categorias
* Busca de produtos
* Seleção de tamanho
* Controle de quantidade
* Carrinho de compras
* Persistência do carrinho utilizando `localStorage`
* Cálculo automático do total
* Remoção de produtos do carrinho
* Finalização do pedido pelo WhatsApp
* Menu responsivo para dispositivos móveis
* Layout adaptável para desktop, tablet e celular
* Página 404 personalizada

---

## 🛒 Carrinho

Como o projeto não possui backend, o carrinho será armazenado localmente no navegador através do `localStorage`.

Fluxo:

```text
Produto
   ↓
Adicionar ao carrinho
   ↓
LocalStorage
   ↓
Carrinho
   ↓
Resumo do pedido
   ↓
WhatsApp
```

O usuário poderá montar seu pedido normalmente, mas a finalização será realizada através do WhatsApp.

---

## 📱 Finalização do pedido

O site deverá gerar automaticamente uma mensagem contendo:

* Produtos selecionados
* Tamanhos
* Quantidades
* Valor individual
* Valor total

Exemplo:

```text
Olá! Gostaria de fazer um pedido na Entrelinhas.

- Não era uma metáfora — M — 1x
- Só mais um capítulo — G — 2x

Total: R$ 269,70
```

A mensagem será enviada através de um link para o WhatsApp da loja.

---

## 🎨 Identidade visual

A identidade da Entrelinhas deverá transmitir uma combinação de **livraria, editorial e streetwear**.

### Direção visual

* Minimalista
* Elegante
* Moderna
* Literária
* Levemente irreverente

### Paleta inicial

```text
Fundo:       #F5F2EA
Texto:       #171717
Destaque:    #8F1D2C
```

### Tipografia

Sugestão inicial:

* **Playfair Display** — títulos e elementos editoriais
* **Inter** — textos e interface

---

## 📖 Conceito de conteúdo

Os produtos devem utilizar referências literárias, trocadilhos e situações reconhecíveis por leitores.

Exemplos:

* "Não era uma metáfora."
* "Só mais um capítulo."
* "Plot Twist."
* "Leio, logo existo."
* "Livros antes dos boletos."
* "404: Final feliz não encontrado."

O conteúdo definitivo será definido posteriormente.

---

## 🌐 Deploy

O projeto deverá ser compatível com **GitHub Pages**.

Não deve depender de um servidor backend para funcionar.

Fluxo de publicação:

```text
Código
  ↓
GitHub
  ↓
GitHub Pages
  ↓
Site público
```

---

## 🚧 Status

**Em desenvolvimento**

### Planejamento

* [ ] Definir identidade visual final
* [ ] Criar estrutura HTML
* [ ] Configurar Tailwind CSS
* [ ] Desenvolver página inicial
* [ ] Desenvolver catálogo
* [ ] Desenvolver página de produto
* [ ] Desenvolver carrinho
* [ ] Implementar LocalStorage
* [ ] Implementar checkout via WhatsApp
* [ ] Criar página Sobre
* [ ] Criar página de contato
* [ ] Criar página 404
* [ ] Otimizar responsividade
* [ ] Configurar SEO
* [ ] Publicar no GitHub Pages

---

## 📌 Princípios do projeto

1. **Simplicidade** — evitar tecnologias desnecessárias.
2. **Performance** — o site deve ser rápido e leve.
3. **Responsividade** — experiência consistente em dispositivos móveis e desktop.
4. **Identidade** — o site deve parecer uma marca, não apenas um catálogo.
5. **Manutenibilidade** — código simples e organizado.
6. **Independência** — funcionamento sem backend ou banco de dados.
7. **Escalabilidade frontend** — produtos e conteúdo devem poder ser adicionados facilmente.

---

## 💡 Conceito

> **Entrelinhas — roupas para quem lê até o que não está escrito.**
