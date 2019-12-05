FROM ubuntu:18.04

RUN apt-get update && apt-get install -y npm

WORKDIR /home/docker
COPY . .
EXPOSE 3000

RUN npm install
CMD node server.js