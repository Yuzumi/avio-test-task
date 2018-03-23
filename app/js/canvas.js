
class Canvas {
    constructor($selector) {
        this.cnvs = document.querySelector($selector);
        this.cntx = this.cnvs.getContext('2d');
    }

    get context() {
        return this.cntx;
    }

    get width() {
        return this.cnvs.width;
    }

    get height() {
        return this.cnvs.height;
    }

    get center() {
        return {
            x: this.width   / 2,
            y: this.height  / 2
        };
    }

    get offsetTop() {
        return this.cnvs.offsetTop;
    }

    get offsetLeft() {
        return this.cnvs.offsetLeft;
    }

    clear() {
        this.cntx.clearRect(0, 0, this.width, this.height);
    }

    drawTriangle(coords, color, angle) {
        const shift = 90;

        angle = (angle - shift) * (Math.PI / 180);

        this.cntx.save();
        this.cntx.translate(this.center.x, this.center.y);
        this.cntx.rotate(angle);
        this.cntx.translate(-this.center.x, -this.center.y);

        this.cntx.beginPath();
        this.cntx.moveTo(coords.a.x, coords.a.y);
        this.cntx.lineTo(coords.b.x, coords.b.y);
        this.cntx.lineTo(coords.c.x, coords.c.y);
        this.cntx.closePath();

        this.cntx.strokeStyle = color;
        this.cntx.stroke();

        this.cntx.restore();
    };

    on(event, callback) {
        this.cnvs.addEventListener(event, callback);
    }
};