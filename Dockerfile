﻿# build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# production stage
FROM nginx:alpine

COPY --from=builder /app/dist/demo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
