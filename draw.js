const canvas = document.querySelector('.draw-area');

let image;

const setupCanvas = () => {
    ctx.canvas.width = "28";
    ctx.canvas.height = "28";
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

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ffffff';

    let {x, y} = getOffset(canvas)

    ctx.moveTo(pos.x - x, pos.y - y); 
    setPosition(e);
    ctx.lineTo(pos.x - x, pos.y - y);

    ctx.stroke(); 
}

const convertCanvas = () => {
    const converted = document.querySelector('.converted');
    const convertedCtx = converted.getContext("2d");
    convertedCtx.width = "28";
    convertedCtx.height = "28";
    image = ctx.getImageData(0, 0, convertedCtx.width, convertedCtx.height);
    console.log()
    convertedCtx.drawImage(image, convertedCtx.width, convertedCtx.height);
}

window.addEventListener('setupCanvas', setupCanvas); 
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
canvas.addEventListener('mouseup', convertCanvas);
