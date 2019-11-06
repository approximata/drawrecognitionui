
const predictButton = document.querySelector('.predict');
const MODEL_URL = 'http://127.0.0.1:3000/model.json';

tf.loadLayersModel(MODEL_URL).then(model => {
    predictButton.onclick = () => {
        const drawing = document.querySelector('.converted');
        const drawingInPixel = tf.browser.fromPixels(drawing, 3).mean(2).div(255.0).expandDims(0);
            console.log(drawingInPixel)
        const prediction = model.predict(drawingInPixel);
        console.log(`prediction: ${prediction}`);
    }
});






