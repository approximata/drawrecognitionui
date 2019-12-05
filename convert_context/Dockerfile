FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
  python3.6 \
  python3-distutils \
  curl

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3.6 get-pip.py --no-setuptools
RUN pip install setuptools
RUN pip install tensorflowjs

WORKDIR /home/docker