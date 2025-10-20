# 📝 To-do List
---
### 📌 Sobre o Projeto
O To-do List é uma aplicação completa para gerenciamento de tarefas que implementa o conceito de Persistência Poliglota, utilizando diferentes bancos de dados para atender a diferentes necessidades da aplicação.
O objetivo é fornecer uma lista de tarefas eficiente, segura e organizada, onde cada usuário possui seu próprio histórico e personalização, separados de forma lógica no backend.

### Arquitetura de Banco de Dados (Polyglot Persistence)
A aplicação utiliza uma abordagem de Micro-serviços de Banco de Dados:

* PostgreSQL (SQL Relacional): Utilizado para o gerenciamento de Usuários e Autenticação (Auth), aproveitando a segurança e integridade referencial de um banco de dados relacional para dados críticos.

* MongoDB (NoSQL Orientado a Documentos): Utilizado para o armazenamento das Tarefas (Tasks), usufruindo da flexibilidade do modelo de documentos para as tarefas que são menos estruturadas.
---
### ✨ Funcionalidades
Front-end (Aplicação Cliente)
* Adicionar Tarefa: Cria novas tarefas na lista.

* Concluir Tarefa: Marca uma tarefa como concluída (visual com text-decoration: line-through).

* Deletar Tarefa: Remove a tarefa da lista.

* Persistência Local (Temporária): O front-end puro (HTML/CSS/JS) utiliza o LocalStorage para manter o estado das tarefas na sessão do usuário.

### Back-end (API com Autenticação)
* Registro de Usuário: Criação de conta no PostgreSQL com senha criptografada (bcryptjs).

* Login de Usuário: Autenticação e emissão de Token JWT para acesso seguro.

* Criação de Tarefa: Rota protegida por JWT que salva novas tarefas no MongoDB, associadas ao userId do usuário autenticado.

* Listagem de Tarefas: Rota protegida que busca todas as tarefas do usuário no MongoDB.
---
🚀 Tecnologias Utilizadas

| Componente | Tecnologia | Modulo
| :--- | :--- | :--- |
| **Front-end** | HTML5, CSS3, JavaScript | Aplicação cliente Pura com persistência em (`localStorage`) |
| **Back-end** | Node.js, Express | Servidor API |
| **Autenticação** | JWT, bcryptjs | Geração de token e hash de senha |
| **DB (Usuários/Auth)** | PostgreSQL | ORM: Sequelize |
| **DB (Tarefas/Tasks)** | MongoDB | ODM: Mongoose |
---
### ⚙️ Como Começar
Siga estas instruções para configurar e rodar o projeto localmente.

## Pré-requisitos
* Node.js (LTS recomendado)

* NPM ou Yarn

* Um servidor PostgreSQL rodando (com um banco de dados configurado).

* Um servidor MongoDB rodando (local ou nuvem como Atlas).

## Instalação
1 - Clone o repositório:
    
  ```bash
    git clone [(https://github.com/FaelAlvezzz/To-do-list)](cd To-do-list)
  ```

2 - Instale as dependências do Back-end:

  ```bash
    npm install
    # ou
    yarn install
  ```

3 - Configuração do .env: Crie um arquivo chamado .env na raiz do projeto e configure as variáveis de ambiente necessárias para a conexão com os dois bancos de dados e o JWT:

   ```Snippet de código
    # Servidor
    PORT=5000 

    # JWT 
    JWT_SECRET=sua_chave_secreta_aqui

    # Configuração do PostgreSQL (Usuários)
    DB_HOST=localhost
    DB_USER=postgres_user
    DB_PASSWORD=postgres_password
    DB_NAME=todo_list_db

    # Configuração do MongoDB (Tarefas)
    MONGO_URI=mongodb://localhost:27017/todo-tasks
  ```

### Execução
1 - Inicie o servidor Node.js:

  ```bash
    npm start 
    # ou 
    node server.js  
  ```
Você verá as mensagens de conexão bem-sucedida para PostgreSQL e MongoDB.

2 - Acesse o Front-end: Abra o arquivo index.html em seu navegador web para a interface da lista de tarefas.
---
### 🤝 Contribuição
Contribuições são bem-vindas! Se você deseja adicionar funcionalidades como filtros de tarefas, edição de itens, ou otimizar a conexão de banco de dados, sinta-se à vontade para abrir uma Issue ou um Pull Request.

  1- Faça um Fork do projeto.

  2- Crie uma branch para sua Feature (git checkout -b feature/minha-feature).

  3- Faça o Commit das suas alterações (git commit -m 'feat: Adiciona nova funcionalidade X').

  4- Faça o Push para a Branch (git push origin feature/minha-feature).

  5- Abra um Pull Request.
---
✉️ Contato
Rafael Alves - [FaelAlvezzz@gmail.com]

Link do Projeto: https://github.com/FaelAlvezzz/To-do-list
