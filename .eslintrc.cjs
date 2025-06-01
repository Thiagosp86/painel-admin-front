module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // desativa regras conflitantes com Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Personalizações
    'react/react-in-jsx-scope': 'off', // Não precisa mais importar React com Vite
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};

// Este arquivo configura o ESLint para um projeto React com TypeScript
// usando o parser do TypeScript e as regras recomendadas.
// Ele também desativa a regra que exige a importação do React no escopo,
// pois o Vite não requer isso a partir do React 17.
