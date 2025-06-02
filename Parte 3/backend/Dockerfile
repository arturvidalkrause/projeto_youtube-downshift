From node:18-alpine

WORKDIR /usr/src/app

# Copia package.json e package.json (ou yarn.lock)
# Isso aproveita o cache do Docker se apenas o código mudar, não as dependencias
COPY package*.json ./

# Instala as dependencias 
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expoe a porta que sua API Node.js usa
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "server.js"]
