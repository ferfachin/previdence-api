# Etapa de compilação
FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY .env ./

RUN npm install --only=production

CMD ["node", "dist/main"]
