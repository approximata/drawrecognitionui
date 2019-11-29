FROM ubuntu:18.04

RUN apt-get update && apt-get install -y npm

WORKDIR /home/docker
EXPOSE 3000
