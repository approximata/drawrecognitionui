# Number recognizer

Toy project implementing the "Hello Word" of Machine Learning, namely the [MNIST Machine Learning Challenge](https://www.kaggle.com/c/mnist-tutorial-machine-learning-challenge).
The project aims to experiment the latest ML APIs (e.g. TensorFlow v2.0).


#### How to launch:
```bash
$ npm install
$ node server.js
```
Once the server is up, open `index.html`.

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
Within Jupyter Lab, open `train_model.ipynb` and run its cells.