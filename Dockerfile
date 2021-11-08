FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./public ./dist/public

COPY ./src/utils/jwk ./dist/src/utils/jwk

EXPOSE 5000

CMD ["npm", "start"]
