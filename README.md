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
$ conda create --name mnist python=3.7
$ conda activate mnist
$ pip install -r requirements.txt
$ pip uninstall prompt-toolkit
$ pip install prompt-toolkit
$ jupyter lab
```
Within Jupyter Lab, open `train_model.ipynb` and run its cells.