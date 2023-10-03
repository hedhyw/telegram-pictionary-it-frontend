FROM node:lts-alpine3.18 as builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app

COPY package.json .
RUN npm --legacy-peer-deps install

COPY . .

RUN npm run build

FROM nginx:1.25.2-alpine3.18

COPY --from=builder /app/build /usr/share/nginx/html
