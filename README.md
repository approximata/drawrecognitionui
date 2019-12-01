# What's your number?

Toy project implementing the "Hello Word" of Machine Learning, namely the
[MNIST Machine Learning Challenge](https://www.kaggle.com/c/mnist-tutorial-machine-learning-challenge).
The project aims to experiment with the latest APIs (e.g. TensorFlow v2.0).


## How to launch the drawing UI
```bash
$ docker build -t ui_image .
$ docker run --name ui_container \
             --rm \
             -it \
             -p 3000:3000 \
             --mount src=$(pwd),target=/home/docker,type=bind \
             ui_image

# within ui_container
$ npm install
$ node server.js
```
Once the JavaScript server is up within `ui_container`, the user reach the UI under http://localhost:3000.

## How to train a new model
```bash
$ docker build -t train_image train_context
$ docker run --name train_container \
             --rm \ 
             -it \
             -p 8888:8888 \
             --mount src=$(pwd)/model,target=/home/docker/model,type=bind \
             train_image
```
`docker run` starts a Jupyter server on `:8888` (hence the port publishing argument of `docker run`).
The server can be reached at the command line provided URL (URL is provided as a result of `docker run`).

>Above configuration includes `plotly` extension installation into `jupyterlab`. This installation step takes quite
long to execute, besides even fails if not enough resources are assigned to the Docker Engine. `plotly` is a nice-to-have
visualisation tool to draw pretty plots – therefore if a quicker-to-build configuration is required, `plotly` is
recommended to be replaced with `matplotlib`. Within this project, `matplotlib` would be more than satisfactory,
default configuration includes `plotly` only for the nicer plots.

After `docker run` gets executed, the `home` folder of `train_container` will look like this:
```
home
└── docker
    ├── model
    │   ├── group1-shard1of1.bin
    │   ├── model.h5
    │   └── model.json
    └── train_model.ipynb
```
- `model` is the folder of 
  - the `.h5` format of the model (format before conversion),
  - the `.bin`+`.json` format of the model (format after conversion).
- `train_model.ipynb` is the Jupyter Notebook with which the user can train a new model.

To train a new model, open the Jupyter server within your browser, open `train_model.ipynb` and execute its cells. 


## How to convert the newly trained model
```bash
$ docker build -t conversion_image conversion_context
$ docker run --name conversion_container \
             --rm \ 
             -it \
             --mount src=$(pwd)/model,target=/home/docker/model,type=bind \
             conversion_image

# within conversion_container
$ tensorflowjs_converter --input_format=keras model/model.h5 model
```
We override the default model with the above conversion. If `ui_container` is still running, restarting its JavaScript
server will start using the newly converted model.