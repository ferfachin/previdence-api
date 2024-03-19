# Previdencia Api

Esta é uma API de autenticação e registro de usuários, construída com NestJS, TypeORM e PostgreSQL. Utiliza JWT (JSON Web Tokens) para gestão de sessões. O projeto é configurado para rodar em containers Docker, e as dependências são gerenciadas com Yarn.

## Começando

Essas instruções vão permitir que você obtenha uma cópia do projeto em execução na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisará do Docker e do Docker Compose instalados em sua máquina para rodar a aplicação e o banco de dados em containers. Além disso, é recomendado ter o Yarn instalado para gerenciar as dependências do projeto.

### Instalação

Siga estes passos para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd previdencia.api
```

2. **Instale as dependências com Yarn:**

```bash
yarn install
```

3. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário.

```bash
cp .env.example .env
```

4. **Inicie os serviços usando Docker Compose:**

```bash
docker-compose up -d
```

Isso vai criar e iniciar todos os serviços necessários, incluindo o banco de dados PostgreSQL e a aplicação NestJS.

### Usando a API

Após iniciar os serviços com Docker, a API estará acessível em `http://localhost:3001`.


### Tecnologias Usadas

- [NestJS](https://nestjs.com/) - O framework web usado
- [TypeORM](https://typeorm.io/#/) - ORM para TypeScript e JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [JWT](https://jwt.io/) - JSON Web Tokens para autenticação
- [Docker](https://www.docker.com/) - Containerização
- [Yarn](https://yarnpkg.com/) - Gerenciamento de dependências

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.