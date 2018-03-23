
const App = ((Canvas, Util) => {
    const fps       = 1000 / 60;

    const canvas    = new Canvas('#canvas')
        , context   = canvas.context
        , center    = canvas.center;

    const mouse     = {
        x       : 0,
        y       : 0,
        angle   : 0 
    }

    const triangle  = {
        a       : 100,
        h       : 200,
        color   : '#fff'
    }; 

    const coords = Util.calculateTriangeCoords(center, triangle.a, triangle.h);

    const mouseMoveListener = (e) => {
        mouse.x     = e.clientX - canvas.offsetLeft;
        mouse.y     = e.clientY - canvas.offsetTop;
        mouse.angle = Util.calculateAngle(canvas.center, mouse);
    };

    return {
        init() {
            canvas.on('mousemove', mouseMoveListener);

            setInterval(() => {
                canvas.clear();
                canvas.drawTriangle(coords, triangle.color, mouse.angle);
            }, fps);
        }
    };
})(Canvas, Util);

App.init();

