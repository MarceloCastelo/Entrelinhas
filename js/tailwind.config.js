// Configuração do Tailwind (Play CDN).
// Carregado logo depois de https://cdn.tailwindcss.com em todas as páginas.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        papel: '#F5F2EA',
        'papel-escuro': '#EAE4D6',
        linha: '#D9D1C0',
        tinta: '#171717',
        grafite: '#5C5750',
        vinho: '#8F1D2C',
        'vinho-escuro': '#6E1522',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        site: '80rem',
      },
    },
  },
};
