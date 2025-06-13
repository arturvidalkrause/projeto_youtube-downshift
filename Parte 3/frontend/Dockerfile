# Stage 1: Build da aplicacao React
FROM node:20.11-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

# Instala as dependencias
RUN yarn install --frozen-lockefile

COPY . .

# Constroi a aplicacao
RUN yarn build

# Stage 2: Servir com Nginx
FROM nginx:stable-alpine

# Copia os arquivos estaticos do build do React para o diretorio padrao do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Opicional: Descomentar a linha abaixo se tiver um arquivo de configuracao customizado do Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
