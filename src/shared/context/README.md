# Pasta: context

Esta pasta contém contextos globais do React, responsáveis por fornecer estado e funções compartilhadas entre componentes.

## O que deve conter

- **AuthContext.tsx**: Gerencia autenticação, login, logout, permissões e persistência do usuário.
- Outros contextos globais podem ser adicionados conforme o crescimento do projeto.

## Por que foi criada?

O uso de contextos permite centralizar regras de negócio e estado global, evitando prop drilling e facilitando o gerenciamento de autenticação e permissões em toda a aplicação.
