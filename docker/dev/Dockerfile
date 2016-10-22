FROM todo-base:latest
MAINTAINER Derek Slagle <derek.slagle@routematch.com>

EXPOSE 22000

RUN apt-get -y update

VOLUME ["/bundle", "/reports"]

COPY src /application
WORKDIR /application

RUN npm i

ENTRYPOINT ["npm", "start"]