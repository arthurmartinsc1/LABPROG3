# Self Order
# 🧾 Self Order

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Docker](https://img.shields.io/badge/docker-suportado-blue)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![FrontendApp](https://img.shields.io/badge/frontendApp-ReactNative-purple)
![Backend](https://img.shields.io/badge/backend-Node.js-green)


## Descrição
O **Self Order** é um sistema de pedidos desenvolvido por alunos do Instituto Militar de Engenharia na disciplina de Laboratorio de Programação III que permite aos usuários navegar por um cardápio, adicionar itens ao carrinho e realizar pedidos. O projeto é composto por um backend em Node.js com Express e PostgreSQL, e um frontend desenvolvido com React, TypeScript e Vite.

## Funcionalidades
### Backend
- **Autenticação e Registro**:
  - Registro de usuários com verificação de e-mail(para o App).
  - Login com autenticação JWT(Para o App).
  - Registro e login simplificado via Totem(Interface Web).
- **Gerenciamento de Produtos**:
  - API para listar produtos disponíveis no cardápio.
  - Inserção automática de produtos no banco de dados.
- **Pedidos**:
  - Criação de pedidos e itens de pedidos.
- **Documentação da API**:
  - Documentação interativa com Swagger disponível em `/api-docs`.

### Frontend
- **Navegação**:
  - Página inicial com opções de login ou navegação sem cadastro.
  - Página principal com categorias de produtos e carrinho de compras.
- **Carrinho de Compras**:
  - Adicionar, remover e ajustar a quantidade de itens no carrinho.
  - Exibição do total do pedido.
- **Pagamento**:
  - Tela para seleção de métodos de pagamento (Pix, Crédito, Débito).
- **Design Responsivo**:
  - Interface amigável e adaptada para diferentes dispositivos.

## 📁 Estrutura do Projeto

```
LABPROG3/
├── backend/
│   ├── routes/             # Definição das rotas da API
│   ├── middlewares/        # Middlewares de autenticação e outros
│   ├── db.js               # Configuração da conexão com o banco
│   ├── emailService.js     # Serviço de envio de e-mails
│   ├── server.js           # Inicialização do servidor Express
│   └── Dockerfile          # Imagem Docker para o backend
│
├── frontend/
│   ├── src/                # Código-fonte principal do frontend
│   ├── public/             # Arquivos públicos (favicon, etc.)
│   ├── Dockerfile          # Imagem Docker para o frontend
│   └── vite.config.ts      # Configuração do Vite
│
├── docker-compose.yaml     # Orquestração com Docker Compose
└── README.md               # Documentação do projeto
```

## Tecnologias Utilizadas
### Backend
- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Token)
- Nodemailer
- Swagger

### Frontend
- React
- TypeScript
- Ant Design
- Vite

### Infraestrutura
- Docker
- Docker Compose

## Como Executar o Projeto(Web Totem)
### Pré-requisitos
- Docker e Docker Compose instalados.
- PostgreSQL17 e pg4admin instalados.

### Passos
1. Clone o repositório:
```bash
   git clone https://github.com/arthurmartinsc1/LABPROG3.git
   cd labprog3
   ```
2. Inicie os containers:

 ```bash
    docker-compose up --build
 ```
3. Acesse o frontend:
 
- URL: http://localhost:5173

4. Acesse a API e a documentação:
- API: http://localhost:3000
- Documentaçao: http://localhost:3000/api-docs
5. Cadastro no totem:
  - Para simular o totem foi implementado sem cadastro personalizado na aplicação web, apenas no app. Porém, é possivel se cadastrar via requisições no ThunderClient ou Postman, por exemplo.
  - Também é possivel realizar os pedidos e acessar as funcionalidades do totem sem cadastro.

## 🔐 Variáveis de Ambiente

Antes de iniciar o projeto, certifique-se de configurar as seguintes variáveis de ambiente no arquivo `.env` localizado na pasta `/backend`:

```env
# Autenticação JWT
JWT_SECRET=seu-segredo-jwt

# Configuração do serviço de e-mail (Nodemailer)
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app

# Acesso ao banco de dados PostgreSQL
SENHA_BD=sua-senha-do-banco
```
## 🔮 Melhorias Futuras

- [ ] Integração com gateway de pagamento real (ex: Stripe ou PagSeguro)
- [ ] Interface de administração para gerenciar produtos, pedidos e usuários
- [ ] Histórico de pedidos por usuário
- [ ] Aplicativo React Native com login,registro,verificação de email  e rastreamento de pedidos
- [ ] Suporte a cupons de desconto e promoções
- [ ] Dashboard com estatísticas de vendas
- [ ] Autenticação OAuth (Google, Facebook, etc.)

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/arthurmartinsc1.png" width="100px;" alt="Foto do Autor 1"/><br />
      <sub><b>Arthur Martins</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/FioravansoG.png" width="100px;" alt="Foto do Autor 2"/><br />
      <sub><b>Giovanna Fioravanso</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/Manima4000.png" width="100px;" alt="Foto do Autor 2"/><br />
      <sub><b>Matheus Andrade</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/MilenaCaruba.png" width="100px;" alt="Foto do Autor 2"/><br />
      <sub><b>Milena Caruba</b></sub>
    </td>
    
  </tr>
</table>





