FROM node:alpine as build

# Define build arguments for environment variables
ARG VITE_RAPID_API_URL
ARG VITE_RAPID_API_HOST
ARG VITE_RAPID_API_KEY
ARG VITE_CLIENT_BASEURL
ARG VITE_BACKEND_PORT
ARG VITE_APP_LOGO
ARG VITE_IMAGEKIT_ENDPOINT

# Set environment variables during the build process
ENV VITE_RAPID_API_URL=$VITE_RAPID_API_URL
ENV VITE_RAPID_API_HOST=$VITE_RAPID_API_HOST
ENV VITE_RAPID_API_KEY=$VITE_RAPID_API_KEY
ENV VITE_CLIENT_BASEURL=$VITE_CLIENT_BASEURL
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT
ENV VITE_APP_LOGO=$VITE_APP_LOGO
ENV VITE_IMAGEKIT_ENDPOINT=$VITE_IMAGEKIT_ENDPOINT


#Build app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#NGINX 
FROM nginx:alpine 
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# RUN rm -rf *
# COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


