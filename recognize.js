import * as tf from '@tensorflow/tfjs';

const MODEL_JSON = localStorage.getItem(model);

const model = await tf.loadGraphModel(MODEL_JSON);

