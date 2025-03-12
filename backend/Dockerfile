# Usa a imagem do Node.js
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos para o container
COPY package.json ./
RUN npm install

COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o backend
CMD ["npm", "start"]
