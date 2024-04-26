FROM node:18-alpine as build

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

ENV RUN_TIME=123 
ENV RUN_TIME3=13 
ENV RUN_TIME2=5 

RUN touch .env
RUN printenv > .env

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx && chgrp -R root /var/cache/nginx && \
    sed -i 's/<port>/8080/g' /etc/nginx/nginx.conf && \
    sed -i 's/<url>/example.com/g' /etc/nginx/nginx.conf && \
    sed -i 's|<DIR>|/usr/share/nginx/html|g' /etc/nginx/nginx.conf && \
    addgroup nginx root 

EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]

