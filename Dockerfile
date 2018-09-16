FROM ubuntu as build

RUN apt-get update && apt-get install -y npm

COPY . /build

RUN sh /build/bin/build.sh

FROM nginx

COPY --from=build /build/web /usr/share/nginx/html

STOPSIGNAL SIGTERM

EXPOSE 80

ENTRYPOINT  ["nginx", "-g", "daemon off;"]