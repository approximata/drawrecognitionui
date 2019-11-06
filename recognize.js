
const predictButton = document.querySelector('.predict');
const MODEL_URL = 'http://127.0.0.1:3000/model.json'


tf.loadLayersModel(MODEL_URL).then(model => {
    predictButton.onclick = () => {
        const drawing = document.querySelector('.draw-area');
        const drawingInPixel = tf.browser.fromPixels(drawing);
        const prediction = model.predict(drawingInPixel);
        console.log(prediction);
    }
});






