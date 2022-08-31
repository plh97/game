(CanvasRenderingContext2D.prototype as any).roundRect = function (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius1 = 5,
    fill: boolean = true,
    stroke: boolean = false
): void {
    const radius = { tl: radius1, tr: radius1, br: radius1, bl: radius1 };
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);

    ctx.closePath();
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

type NUM = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

// enum NUM {
//     TWO = 2,
//     FOUR = 4,
//     EIGHT = 8,
//     SIXTEEN = 16,
//     THIRTY_TWO = 32,
//     SIXTY_FOUR = 64,
//     ONE_HUNDRED_TWENTY_EIGHT = 128,
//     TWO_HUNDRED_FIFTY_SIX = 256,
//     FIVE_HUNDRED_TWELVE = 512,
//     ONE_THOUSAND_AND_TWENTY_FOURTH = 1024,
//     TWO_THOUSAND_AND_FORTY_EIGHTH = 2048,
// }

class Block {
    x: number;
    y: number;
    size: number;
    gutter: number;
    num: NUM;
    color: string;
    constant: Record<NUM, string>;
    constructor(x: number, y: number, color: string = "#eee4da59") {
        this.x = x;
        this.y = y;
        this.gutter = 7.5;
        this.size = 100;
        this.color = color;
        this.num = Math.random() > 0.5 ? 2 : 4;
        this.constant = {
            2: "#eee4da",
            4: "#eee1c9",
            8: "#f3b27a",
            16: "#f69664",
            32: "#f77c5f",
            64: "#f77c5f",
            128: "#edd073",
            256: "#edcc62", // need shadow
            512: "#edc950", // need shadow
            1024: "#edc53f", // need shadow
            2048: "#edd073", // win
        };
    }
    draw() {
        roundRect(
            this.x * this.size + this.gutter,
            this.y * this.size + this.gutter,
            this.size - this.gutter * 2,
            this.size - this.gutter * 2,
            this.color
        );
    }
    drawText() {
        roundRect(
            this.x * this.size + this.gutter,
            this.y * this.size + this.gutter,
            this.size - this.gutter * 2,
            this.size - this.gutter * 2,
            this.constant[this.num]
        );
        ctx.beginPath();
        ctx.fillStyle = "#776e65";
        ctx.font =
            'bold 48px "Clear Sans", "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(
            this.num.toString(),
            (this.x + 0.5) * this.size - 12,
            (this.y + 0.5) * this.size + 15
        );
        ctx.stroke();
    }
}

const app = {
    data: {
        // blocks: [] as Block[],
        map: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ] as (Block | null)[][],
        score: 0,
        width: 400,
    },
    init() {
        canvas.width = this.data.width;
        canvas.height = this.data.width;
        this.drawBackground();
        this.addBlock();
        this.addBlock();
        this.drawCell();
        this.drawBlock();
        this.bindEvent();
        this.bindEvent();
        this.bindEvent();
        this.bindEvent();
    },
    findBlockByRandom() {
        const containers: { i: number; j: number }[] = [];
        this.data.map.forEach((col, i) => {
            col.forEach((e, j) => {
                if (!e) {
                    containers.push({ i, j });
                }
            });
        });
        const randomNum = Math.floor(Math.random() * containers.length);
        return containers[randomNum];
    },
    addBlock() {
        const random = this.findBlockByRandom();
        if (!random) return;
        const { i, j } = random;
        this.data.map[i][j] = new Block(i, j);
    },
    drawBackground() {
        roundRect(0, 0, this.data.width, this.data.width, "#bbada0");
    },
    drawCell() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = new Block(i, j);
                cell.draw();
            }
        }
    },
    drawBlock() {
        this.data.map.forEach((col) => {
            col.forEach((block) => {
                block?.drawText();
            });
        });
    },
    bindEvent() {
        document.addEventListener(
            "keyup",
            (event) => {
                if (event.key === "ArrowLeft") {
                    console.log(event);
                } else if (event.key === "ArrowRight") {
                    console.log(event);
                } else if (event.key === "ArrowUp") {
                    console.log(event);
                } else if (event.key === "ArrowDown") {
                    console.log(event);
                }
            },
            false
        );
    },
};

app.init();
