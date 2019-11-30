# Number recognizer

Toy project implementing the "Hello Word" of Machine Learning, namely the [MNIST Machine Learning Challenge](https://www.kaggle.com/c/mnist-tutorial-machine-learning-challenge).
The project aims to experiment the latest ML APIs (e.g. TensorFlow v2.0).


#### How to launch:
```bash
docker build -t ui_image .
docker run --name ui_container \
           --rm \
           -it \
           -p 3000:3000 \
           --mount src=$(pwd),target=/home/docker,type=bind \
           ui_image

# within ui_container
npm install
node server.js
```
Once the server is up within `ui_container`, you can reach the UI under http://localhost:3000.

#### How to train a new model:
```bash
cd train
docker build -t train_image .
docker run --name train_container \
           --rm \ 
           -it \
           -p 8888:8888 \
           --mount src=$(dirname $(pwd))/model,target=/home/docker/model,type=bind \
           train_image
```
Folder structure within `train_container` after `docker run`.
```
home
`-- docker
    |-- model
    |   |-- group1-shard1of1.bin
    |   `-- model.json
    `-- train_model.ipynb
```
