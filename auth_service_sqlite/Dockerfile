FROM node:20

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install

EXPOSE 3000

CMD ["./node_modules/.bin/nodemon", "dist/index.js"]