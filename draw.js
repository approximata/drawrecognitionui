const canvas = document.querySelector('.draw-area');

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

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    let {x, y} = getOffset(canvas)

    ctx.moveTo(pos.x - x, pos.y - y); 
    setPosition(e);
    ctx.lineTo(pos.x - x, pos.y - y);

    ctx.stroke(); 
}


window.addEventListener('setupCanvas', setupCanvas);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
