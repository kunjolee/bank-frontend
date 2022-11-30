# BUILD
# docker build -t frontend:1.0.0-alpine .
# RUN
# docker run -d -p 4173:80 frontend:1.0.0-alpine
# This is the first stage of my Dockerfile

FROM node:16-alpine as build 

ENV VITE_API_URL=http://localhost:8001

COPY . /app

WORKDIR /app
 
RUN yarn install

RUN yarn build

FROM nginx:1.23.2-alpine

COPY --from=build /app/dist /usr/share/nginx/html