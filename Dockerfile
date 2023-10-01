FROM node:lts-alpine3.18

WORKDIR /app

COPY package.json .
RUN npm --legacy-peer-deps install

COPY . .

CMD ["npm", "run", "start"]
