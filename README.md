# Autenticação com JWT - Projeto Fullstack (React + NestJS + PostgreSQL)

Este é um guia detalhado de tudo que foi feito até agora no projeto de autenticação com JWT, com frontend em **React + TypeScript** e backend em **NestJS + Prisma + PostgreSQL**.

---

## 🔹 Estrutura do Projeto

```
/www
├── my-admin-panel     # Frontend React
└── auth-backend       # Backend NestJS
```

---

## 📁 Backend (NestJS)

### 1. Criação do projeto NestJS
```bash
nest new auth-backend
```

### 2. Configuração do Prisma + PostgreSQL
```bash
npm install prisma @prisma/client
npx prisma init
```

- No arquivo `.env`, configurar URL do banco:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 3. Definir schema Prisma
```prisma
model User {
  id       Int     @id @default(autoincrement())
  name     String
  email    String  @unique
  password String
}
```
```bash
npx prisma migrate dev --name init
```

### 4. Criar o PrismaService
Arquivo: `src/prisma/prisma.service.ts`
```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {}
```

### 5. Módulo e Service de Auth
```bash
nest g module auth
nest g service auth
nest g controller auth
```

### 6. Instalar e configurar JWT
```bash
npm install @nestjs/jwt
```
No `auth.module.ts`:
```ts
JwtModule.register({
  secret: 'sua_chave_secreta_aqui',
  signOptions: { expiresIn: '1d' },
})
```

### 7. AuthService
```ts
async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    throw new UnauthorizedException('Credenciais inválidas');
  }
  const payload = { sub: user.id, email: user.email, name: user.name };
  const token = this.jwtService.sign(payload);
  return {
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}
```

### 8. Endpoint protegido `/auth/profile`
- Usa o `JwtGuard` e `@Req()` para acessar o token decodificado.

### 9. Liberar CORS no `main.ts`
```ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### 10. Seed com 3 usuários
```bash
npx prisma db seed
```
Arquivo `prisma/seed.ts`:
```ts
await prisma.user.createMany({
  data: [
    { name: 'User One', email: 'user1@example.com', password: 'thiago' },
    { name: 'User Two', email: 'user2@example.com', password: 'thiago' },
    { name: 'User Three', email: 'user3@example.com', password: 'thiago' },
  ]
});
```

---

## 📁 Frontend (React + Vite + TypeScript)

### 1. Criação do projeto React
```bash
npm create vite@latest my-admin-panel -- --template react-ts
```

### 2. Estrutura e ferramentas
- ESLint, Prettier, Alias: `@` para `src`
- Roteamento com React Router

### 3. AuthContext com login real via backend
Arquivo: `shared/context/AuthContext.tsx`

```ts
const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    setUser(user);
    navigate('/dashboard');
  } catch (err) {
    alert('Credenciais inválidas');
  }
};
```

### 4. LoginPage com form funcional
```ts
<form onSubmit={handleSubmit}>
  <input type="email" ... />
  <input type="password" ... />
  <button type="submit">Entrar</button>
</form>
```

### 5. Testes
- Login com sucesso: token é salvo e redireciona para `/dashboard`
- Verificação de JWT: token armazenado e válido

---

## ✅ Status Atual
- [x] Backend funcionando com autenticação JWT
- [x] Frontend envia email/senha e trata resposta
- [x] Redirecionamento após login
- [x] Seed de banco com 3 usuários testados
- [x] CORS habilitado e token funcionando

---

## 📈 Próximos Passos
- Implementar `AuthGuard` no frontend para proteger rotas
- Recuperar perfil logado via `/auth/profile`
- Salvar token no `localStorage` e carregar estado ao iniciar
- Exibir nome do usuário logado no dashboard
- Adicionar logout