# Self Order
# 🧾 Self Order

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Docker](https://img.shields.io/badge/docker-suportado-blue)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![FrontendApp](https://img.shields.io/badge/frontendApp-ReactNative-purple)
![Backend](https://img.shields.io/badge/backend-Node.js-green)

## 📱 Descrição
O **Self Order** é um sistema completo de pedidos desenvolvido por alunos do Instituto Militar de Engenharia na disciplina de Laboratório de Programação III. O sistema oferece duas interfaces:

1. **Totem Web**: Interface web para pedidos em totens físicos
2. **App Mobile**: Aplicativo React Native para pedidos via smartphone

O projeto é composto por:
- Backend em Node.js com Express e PostgreSQL
- Frontend Web em React, TypeScript e Vite
- App Mobile em React Native

## 🚀 Funcionalidades

### 📱 App Mobile
- **Autenticação Completa**:
  - Registro com verificação de e-mail
  - Login com JWT
  - Recuperação de senha
- **Pedidos**:
  - Navegação por categorias
  - Carrinho de compras
  - Histórico de pedidos
  - Rastreamento de pedidos
- **Perfil**:
  - Gerenciamento de dados pessoais
  - Histórico de pedidos
  - Favoritos

### 💻 Totem Web
- **Pedidos Rápidos**:
  - Navegação simplificada
  - Sem necessidade de cadastro
  - Interface otimizada para totens
- **Carrinho**:
  - Adição/remoção de itens
  - Ajuste de quantidades
  - Cálculo automático do total

### 🔧 Backend
- **Autenticação**:
  - Sistema JWT
  - Verificação de e-mail
  - Gerenciamento de sessões
- **Produtos**:
  - API RESTful
  - Categorização
  - Gerenciamento de estoque
- **Pedidos**:
  - Criação e gerenciamento
  - Status em tempo real
  - Histórico
- **Documentação**:
  - Swagger UI em `/api-docs`
  - Documentação de endpoints

## 📁 Estrutura do Projeto

```
LABPROG3/
├── backend/
│   ├── routes/             # Rotas da API
│   ├── middlewares/        # Middlewares
│   ├── db.js              # Configuração do banco
│   ├── emailService.js    # Serviço de e-mail
│   ├── server.js          # Servidor Express
│   └── Dockerfile         # Docker backend
│
├── frontend/
│   ├── src/               # Código web
│   ├── public/            # Arquivos estáticos
│   ├── Dockerfile         # Docker frontend
│   └── vite.config.ts     # Config Vite
│
├── appMcdonalds/
│   ├── src/               # Código mobile
│   │   ├── components/    # Componentes React Native
│   │   ├── screens/       # Telas do app
│   │   └── services/      # Serviços e APIs
│   └── App.tsx            # Entrada do app
│
├── docker-compose.yaml    # Orquestração Docker
└── README.md             # Documentação
```

## 🛠️ Tecnologias

### Backend
- Node.js & Express
- PostgreSQL
- JWT
- Nodemailer
- Swagger

### Frontend Web
- React
- TypeScript
- Ant Design
- Vite

### App Mobile
- React Native
- Expo
- TypeScript
- React Navigation

### Infraestrutura
- Docker
- Docker Compose

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+
- PostgreSQL 17
- pgAdmin 4

### Backend e Frontend Web
1. Clone o repositório:
```bash
git clone https://github.com/arthurmartinsc1/LABPROG3.git
cd labprog3
```

2. Inicie os containers:
```bash
docker-compose up --build
```

3. Acesse:
- Web: http://localhost:5173
- API: http://localhost:3000
- Docs: http://localhost:3000/api-docs

### App Mobile
1. Entre na pasta do app:
```bash
cd appMcdonalds
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o app:
```bash
npx expo start
```

4. Use o Expo Go no seu celular para testar

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
# JWT
JWT_SECRET=seu-segredo-jwt

# Email
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app

# Database
SENHA_BD=sua-senha-do-banco
```

### App Mobile (.env)
```env
API_URL=http://localhost:3000
```
### App Mobile (config.tsx)
```config.tsx
export const API_URL = "SEU_IP" + port
```

## 🔮 Roadmap

- [ ] Integração com gateway de pagamento
- [ ] Dashboard administrativo
- [ ] Sistema de fidelidade
- [ ] Notificações push
- [ ] Geolocalização de pedidos
- [ ] Suporte offline
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 👥 Autores

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/arthurmartinsc1.png" width="100px;" alt="Arthur Martins"/><br />
      <sub><b>Arthur Martins</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/FioravansoG.png" width="100px;" alt="Giovanna Fioravanso"/><br />
      <sub><b>Giovanna Fioravanso</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/Manima4000.png" width="100px;" alt="Matheus Andrade"/><br />
      <sub><b>Matheus Andrade</b></sub>
    </td>
    <td align="center">
      <img src="https://github.com/MilenaCaruba.png" width="100px;" alt="Milena Caruba"/><br />
      <sub><b>Milena Caruba</b></sub>
    </td>
  </tr>
</table>

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.





