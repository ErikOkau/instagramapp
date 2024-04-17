FROM node:18-slim

WORKDIR /

COPY package.json ./
RUN npm i

COPY . .

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]