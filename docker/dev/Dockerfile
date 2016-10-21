FROM todo-base:latest
MAINTAINER Derek Slagle <derek.slagle@routematch.com>

RUN apt-get -y update

VOLUME ["/bundle", "/reports"]

COPY src /application
WORKDIR /application

RUN npm i

#ADD scripts/entry.sh /usr/local/bin/entry.sh
#RUN chmod +x /usr/local/bin/entry.sh
ENTRYPOINT ["npm", "start"]