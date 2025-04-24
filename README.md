# 🎓 Course Platform API

API RESTful para gerenciamento de cursos, desenvolvida com NodeJS, TypeScript, Express e Prisma. Este projeto foi criado com o objetivo de praticar conceitos de arquitetura limpa, testes automatizados e integração com banco de dados utilizando o Prisma ORM.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Docker** e **Docker Compose**
- **Jest** para testes automatizados
- **ESLint** e **Prettier** para padronização de código
- **dotenv** para gerenciamento de variáveis de ambiente

## ⚙️ Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

### Passos para rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/viniciustg/course-platform-api.git
   cd course-platform-api
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/course_platform"
   ```

4. Execute as migrações do banco de dados:

   ```bash
   yarn prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   yarn dev
   ```

   A API estará disponível em `http://localhost:3000`.

## 🧪 Testes

Para rodar os testes automatizados:

```bash
yarn test
```

## 📂 Estrutura de Pastas

```
├── src
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   └── ...
├── prisma
│   ├── schema.prisma
│   └── ...
├── tests
├── .env
├── docker-compose.yml
├── package.json
└── ...
```
