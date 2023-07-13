FROM tpitalia3/tpdevprovfrontend AS front
WORKDIR /app

# Stage 2: Serve the Angular app with Nginx
FROM tpitalia3/tpdevprovbackend
COPY --from=front /usr/share/nginx/html/Back-office/ /app/wwwroot/
COPY assets/config.json /app/wwwroot/assets/config.json
