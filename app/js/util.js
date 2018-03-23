
class Util {
        /**
     * Определяет угол между позицией указателя мыши и осью OX
     * @param {*} point координаты центра экрана
     * @param {*} mouse координаты указателя миши
     */
    static calculateAngle(point, mouse) {
        let angle = Math.atan2(point.y - mouse.y, point.x - mouse.x) * (180 / Math.PI);

        return (angle < 0) ? (angle + 360) : angle;
    };

    /**
     * Рассчитывает координаты треугольника
     * @param {*} barycenter центр масс
     * @param {*} a длина основания
     * @param {*} h биссектриса, проведенная к основанию (высота)
     */
    static calculateTriangeCoords(barycenter, a, h) {
        let da = a / 2;
        let dh = h / 3;

        return {
            a: {
                x: barycenter.x,
                y: barycenter.y - dh * 2
            },
            b: {
                x: barycenter.x - da,
                y: barycenter.y + dh
            },
            c: {
                x: barycenter.x + da,
                y: barycenter.y + dh
            }
        };
    }
};