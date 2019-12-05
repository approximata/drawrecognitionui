FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
  python3.6 \
  python3-distutils \
  curl

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3.6 get-pip.py --no-setuptools
RUN pip install setuptools

RUN pip install \
  tensorflow==2.0.0 \
  jupyterlab \
  pandas \
  plotly \
  ipykernel==5.1.1 \
  matplotlib

# jupyterlab plotly extension
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
RUN npm install
RUN jupyter labextension install @jupyterlab/plotly-extension

WORKDIR /home/docker
COPY train_model.ipynb .
EXPOSE 8888

CMD jupyter lab --ip 0.0.0.0 --no-browser --allow-root