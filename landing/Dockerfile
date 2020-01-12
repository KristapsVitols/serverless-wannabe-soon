FROM node:13.5-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i && npm cache clean --force

COPY . .

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3001

CMD ["npm", "run", "dev"]
