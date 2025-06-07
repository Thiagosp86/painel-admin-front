# Painel Admin - Autenticação JWT (React + NestJS)

Este projeto é um painel administrativo fullstack, com autenticação JWT, utilizando **React + TypeScript** no frontend e um microserviço de autenticação (NestJS) no backend.

---

## 📁 Estrutura do Projeto

```
/www
├── my-admin-panel     # Frontend React
└── auth-backend       # Backend NestJS (serviço de autenticação)
```

---

## 🔹 Integração com o Serviço de Autenticação

O frontend comunica-se com o microserviço de autenticação via HTTP, utilizando endpoints para login, logout e recuperação do perfil do usuário autenticado. Toda a lógica de banco de dados e gerenciamento de usuários está centralizada no serviço de autenticação.

---

## 🔹 Frontend (React + Vite + TypeScript)

### 1. Criação do Projeto
Criado com Vite para desenvolvimento rápido:
```bash
npm create vite@latest my-admin-panel -- --template react-ts
```

### 2. Estrutura e Ferramentas
- **ESLint/Prettier**: Padronização de código.
- **Alias `@`**: Facilita imports.
- **React Router**: Gerenciamento de rotas.
- **Tailwind CSS**: Utilizado para estilização rápida e responsiva.
- **shadcn/ui**: Kit de componentes React moderno e personalizável.
- **lucide-react**: Ícones SVG modernos.

### 3. Instalação de Dependências de UI

Para utilizar os componentes e estilos do projeto, execute:

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

#### Configure o Tailwind

No arquivo `tailwind.config.js`:
```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```
No arquivo `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Instale e gere os componentes do shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button input card label
```

---

## 🔹 AuthContext

Gerencia autenticação globalmente:
- Faz login via backend.
- Salva token e usuário no `localStorage`.
- Recupera estado ao iniciar.
- Permite logout e checagem de permissões reais vindas do backend.
- Exibe loading durante autenticação.

---

## 🔹 LoginPage

Página de login estilizada com shadcn/ui e Tailwind.  
Ao submeter, chama o método `login` do contexto.

---

## 🔹 DashboardPage

Página protegida, só acessível autenticado.  
Exibe o nome do usuário logado, email, status e último login, usando cards do shadcn/ui.

---

## 🔹 ProtectedRoute

Componente que protege rotas, redirecionando para login se não autenticado.

---

## 🔹 Persistência de Sessão

Ao recarregar, o contexto recupera token e usuário do `localStorage` para manter o usuário logado.

---

## 🔹 Logout

Remove token e usuário do `localStorage` e redireciona para login.

---

## ✅ Status Atual

- [x] Integração com serviço de autenticação JWT e endpoints protegidos
- [x] Frontend com login, logout e proteção de rotas
- [x] Persistência de sessão no frontend
- [x] Permissões reais por usuário implementadas
- [x] Nome do usuário logado exibido no dashboard
- [x] UI/UX moderna com shadcn/ui e Tailwind

---

## 📈 Próximos Passos

- Adicionar testes automatizados

---

## 📂 Documentação por Pasta

Cada pasta do frontend contém um `README.md` explicando o propósito e o que deve conter. Veja os arquivos `README.md` dentro de cada diretório para detalhes.