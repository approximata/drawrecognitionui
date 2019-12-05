'use strict'

const MODEL_URL = 'http://127.0.0.1:3000/model.json';

const canvas = document.querySelector('.draw-area');

const setupCanvas = () => {
    ctx.canvas.width = "280";
    ctx.canvas.height = "280";
}


// Draw

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
}

const ctx = canvas.getContext('2d');

const pos = {
    x: 0,
    y: 0
};

const setPosition = (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
}

const draw = (e) => {
    if (e.buttons !== 1) return;

    ctx.beginPath();

    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ffffff';

    let {
        x,
        y
    } = getOffset(canvas)

    ctx.moveTo(pos.x - x, pos.y - y);
    setPosition(e);
    ctx.lineTo(pos.x - x, pos.y - y);
    ctx.stroke();
}

// Draw End

// Clear

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const removeDomElement = (element) => {
    if (element) {
        element.parentNode.removeChild(element);
    }
}

const removeResult = () => {
    const resultElement = document.querySelector('.result');
    removeDomElement(resultElement);
}

const clear = () => {
    clearCanvas();
    removeResizedCanvas();
    removeResult();
}

// Clear End

// Show Result

const resizeRecCanvas = (size) => {
    const image = new Image();
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = size,
        resizedCanvas.height = size,
        resizedCanvas.className = 'resized-canvas'
    const cctx = resizedCanvas.getContext("2d");
    image.onload = function () {
        cctx.drawImage(image, 0, 0, size, size);
    };
    image.src = canvas.toDataURL('image/jpeg', 1.0);
    return resizedCanvas;
}

const removeResizedCanvas = () => {
    const resizedCanvasElement = document.querySelector('.resized-canvas');
    removeDomElement(resizedCanvasElement);
}

const showResizedCanvas = () => {
    removeResizedCanvas();
    const tfCanvasPlaceholder = document.querySelector('.tf-canvas-placeholder');
    const resizedCanvas = resizeRecCanvas(28);
    tfCanvasPlaceholder.appendChild(resizedCanvas);
}

const predictionResolver = () => {
     return new Promise(resolve => {
        tf.loadLayersModel(MODEL_URL).then(model => {
            const drawing = document.querySelector('.resized-canvas');
            const preprocessedDrawing = tf.browser.fromPixels(drawing, 3).div(255).mul([0.299, 0.587, 0.114]).sum(2).expandDims(0);
            const prediction = model.predict(preprocessedDrawing);
            resolve(prediction);
        });
    })};

const showPredictionResult = (predictionResult) => {
    removeResult();
    const resultWrapper = document.querySelector('.result-wrapper');
    const resultElement = document.createElement('div');
    resultElement.className = 'result'
    predictionResult.dataSync().forEach((element, index) => {
        const row = document.createElement('p');
        const rounded = element.toFixed(3);
        row.innerHTML = `${index} :  ${rounded}`;
        resultElement.appendChild(row);
    })
    resultWrapper.appendChild(resultElement);
}

const showResult = () => {
    showResizedCanvas();
    predictionResolver().then((prediction => {
        showPredictionResult(prediction);
    }))
}

// Show end 

setupCanvas();
document.querySelector('.clear').onclick = clear;

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
canvas.addEventListener('mouseup', showResult);
