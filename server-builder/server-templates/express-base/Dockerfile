FROM node:13.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i && npm cache clean --force

COPY . .

CMD ["node", "index.js"]