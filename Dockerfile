FROM node:alpine as build

#Build app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#NGINX 
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf*
COPY --from=build /app/build .


