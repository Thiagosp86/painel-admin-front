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

### 3. AuthContext
Gerencia autenticação globalmente:
- Faz login via backend.
- Salva token e usuário no `localStorage`.
- Recupera estado ao iniciar.
- Permite logout e checagem de permissões reais vindas do backend.

### 4. LoginPage
Página de login com formulário controlado.  
Ao submeter, chama o método `login` do contexto.

### 5. DashboardPage
Página protegida, só acessível autenticado.  
Exibe o nome do usuário logado, permissões reais e botão de logout.

### 6. ProtectedRoute
Componente que protege rotas, redirecionando para login se não autenticado.

### 7. Persistência de Sessão
Ao recarregar, o contexto recupera token e usuário do `localStorage` para manter o usuário logado.

### 8. Logout
Remove token e usuário do `localStorage` e redireciona para login.

---

## ✅ Status Atual

- [x] Integração com serviço de autenticação JWT e endpoints protegidos
- [x] Frontend com login, logout e proteção de rotas
- [x] Persistência de sessão no frontend
- [x] Permissões reais por usuário implementadas
- [x] Nome do usuário logado exibido no dashboard
- [x] Melhorar UI/UX

---

## 📈 Próximos Passos

- Adicionar testes automatizados

---

## 📂 Documentação por Pasta

Cada pasta do frontend contém um `README.md` explicando o propósito e o que deve conter. Veja os arquivos `README.md` dentro de cada diretório para detalhes.