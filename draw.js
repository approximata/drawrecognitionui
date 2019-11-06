const canvas = document.querySelector('.draw-area');

let image;

const setupCanvas = () => {
    ctx.canvas.width = "280";
    ctx.canvas.height = "280";
}

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
}

const ctx = canvas.getContext('2d');
setupCanvas();

const pos = { x: 0, y: 0 };

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

    let {x, y} = getOffset(canvas)

    ctx.moveTo(pos.x - x, pos.y - y); 
    setPosition(e);
    ctx.lineTo(pos.x - x, pos.y - y);

    ctx.stroke(); 
}

function showColorImg() {
    this.style.display = 'none';
    this.nextSibling.style.display = 'inline';
}

function showGrayImg() {
    this.previousSibling.style.display = 'inline';
    this.style.display = 'none';
}

// function removeColors() {
//     var aImages = document.getElementsByClassName('grayscale'),
//         nImgsLen = aImages.length,
//         oCanvas = document.createElement('canvas'),
//         oCtx = oCanvas.getContext('2d');
//     for (var nWidth, nHeight, oImgData, oGrayImg, nPixel, aPix, nPixLen, nImgId = 0; nImgId < nImgsLen; nImgId++) {
//         oColorImg = aImages[nImgId];
//         nWidth = oColorImg.offsetWidth;
//         nHeight = oColorImg.offsetHeight;
//         oCanvas.width = nWidth;
//         oCanvas.height = nHeight;
//         oCtx.drawImage(oColorImg, 0, 0);
//         oImgData = oCtx.getImageData(0, 0, nWidth, nHeight);
//         aPix = oImgData.data;
//         nPixLen = aPix.length;
//         for (nPixel = 0; nPixel < nPixLen; nPixel += 4) {
//             aPix[nPixel + 2] = aPix[nPixel + 1] = aPix[nPixel] = (aPix[nPixel] + aPix[nPixel + 1] + aPix[nPixel + 2]) / 3;
//         }
//         oCtx.putImageData(oImgData, 0, 0);
//         oGrayImg = new Image();
//         oGrayImg.src = oCanvas.toDataURL();
//         oGrayImg.onmouseover = showColorImg;
//         oColorImg.onmouseout = showGrayImg;
//         oCtx.clearRect(0, 0, nWidth, nHeight);
//         oColorImg.style.display = "none";
//         oColorImg.parentNode.insertBefore(oGrayImg, oColorImg);
//     }
// }

const convertCanvas = () => {
    const predictElement = document.querySelector('.converted-wrapper');
    image = new Image();
    const converted = document.createElement('canvas');
    converted.width = "28",
    converted.height = "28",
    converted.className = 'converted'
    const cctx = converted.getContext("2d");
    image.onload = function () {
        cctx.filter = 'grayscale(1)';
        cctx.drawImage(image, 0, 0, 28, 28);
    };
    image.src = canvas.toDataURL('image/jpeg', 1.0);
    predictElement.appendChild(converted);
}

window.addEventListener('setupCanvas', setupCanvas); 
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
canvas.addEventListener('mouseup', convertCanvas);
