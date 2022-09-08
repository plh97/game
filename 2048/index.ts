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

const COLOR_LIST = {
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

const BLOCK_SIZE = 100;

class Cell {
    x: number;
    y: number;
    size: number;
    gutter: number;
    color: string;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = BLOCK_SIZE;
        this.gutter = 7.5;
        this.color = "#eee4da59";
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
}

class Block {
    size: number;
    // for animation,
    renderX: number;
    renderY: number;
    gutter: number;
    num: NUM;
    speed: number;
    scale: number;
    constructor(x: number, y: number, num?: NUM) {
        this.scale = 1;
        this.size = BLOCK_SIZE;
        this.renderX = x * this.size;
        this.speed = 10;
        this.renderY = y * this.size;
        this.gutter = 7.5;
        this.num = num || (Math.random() > 0.5 ? 2 : 4);
    }
    approaching(x: number, y: number) {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (
                    this.renderY === y &&
                    this.renderX === x &&
                    this.scale === 1
                ) {
                    resolve("");
                    clearInterval(timer);
                }
                if (x !== this.renderX) {
                    if (Math.abs(x - this.renderX) < this.speed) {
                        this.renderX = x;
                    }
                    this.renderX += (x > this.renderX ? 1 : -1) * this.speed;
                }
                if (y !== this.renderY) {
                    if (Math.abs(y - this.renderY) < this.speed) {
                        this.renderY = y;
                    }
                    this.renderY += (y > this.renderY ? 1 : -1) * this.speed;
                }
                if (this.scale !== 1) {
                    if (Math.abs(this.scale - 1) < 0.05) {
                        this.scale = 1;
                    }
                    this.scale += this.scale < 1 ? 0.05 : -0.05;
                }
            }, 16);
        });
    }
    async sync() {
        let x = -1;
        let y = -1;
        app.data.map.forEach((col, j) => {
            col.forEach((e, i) => {
                if (e === this) {
                    x = i * 100;
                    y = j * 100;
                }
            });
        });
        return await this.approaching(x, y);
    }
    destroyed() {
        app.data.map.forEach((col, j) => {
            col.forEach((e, i) => {
                if (e === this) {
                    app.data.map[j][i] = null;
                }
            });
        });
    }
    drawText() {
        roundRect(
            this.renderX + this.gutter - (this.size / 2) * (this.scale - 1),
            this.renderY + this.gutter - (this.size / 2) * (this.scale - 1),
            this.size - this.gutter * 2 + this.size * (this.scale - 1),
            this.size - this.gutter * 2 + this.size * (this.scale - 1),
            COLOR_LIST[this.num]
        );
        ctx.beginPath();
        ctx.fillStyle = this.num > 4 ? "white" : "#776e65";
        const textWidth = ctx.measureText(this.num.toString()).width;
        ctx.font =
            'bold 48px "Clear Sans", "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(
            this.num.toString(),
            this.renderX + 50 - textWidth / 2,
            this.renderY + 50 + 15
        );
        ctx.stroke();
    }
}

const app = {
    data: {
        map: [
            [
                new Block(0, 0, 8),
                new Block(1, 0, 4),
                new Block(2, 0, 2),
                new Block(3, 0, 2),
            ],
            [
                new Block(0, 1, 4),
                new Block(1, 1, 2),
                new Block(2, 1, 2),
                new Block(3, 1, 2),
            ],
            [null, null, null, null],
            [null, null, null, null],
        ] as (Block | null)[][],
        score: 0,
        width: 400,
    },
    init() {
        canvas.width = this.data.width;
        canvas.height = this.data.width;
        // this.addBlock();
        // this.addBlock();
        this.bindEvent();
    },
    draw() {
        this.drawBackground();
        this.drawCell();
        this.drawBlock();
        this.drawBlock();
    },
    findEmptyPositionByRandom() {
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
        const random = this.findEmptyPositionByRandom();
        if (!random) return;
        const { i, j } = random;
        this.data.map[i][j] = new Block(j, i);
    },
    drawBackground() {
        roundRect(0, 0, this.data.width, this.data.width, "#bbada0");
    },
    drawCell() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = new Cell(i, j);
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
            async (event) => {
                if (event.key === "ArrowLeft") {
                    if (!(await this.moveLeft())) return;
                    setTimeout(() => {
                        this.addBlock();
                    }, 200);
                } else if (event.key === "ArrowRight") {
                    this.addBlock();
                } else if (event.key === "ArrowUp") {
                    this.addBlock();
                } else if (event.key === "ArrowDown") {
                    this.addBlock();
                }
            },
            false
        );
    },
    swap(x1: number, y1: number, x2: number, y2: number) {
        [this.data.map[x1][y1], this.data.map[x2][y2]] = [
            this.data.map[x2][y2],
            this.data.map[x1][y1],
        ];
    },
    async moveLeft() {
        let isOperate = false;
        // Strategy
        // 1. seperate every single column
        // 2. move first block to left
        // 3. every single block merge one time
        const move = async (i: number, j: number) => {
            while (j >= 1 && this.data.map[i][j - 1] === null) {
                isOperate = true;
                this.swap(i, j, i, j - 1);
                j--;
            }
        };
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                // move, from left to right
                const block = this.data.map[i][j];
                if (block) {
                    move(i, j);
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                // merge, from right to left
                if (await this.merge(i, j - 1, i, j)) {
                    // once merge success
                    isOperate = true;
                    j--;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                // move, from left to right
                const block = this.data.map[i][j];
                if (block) {
                    move(i, j);
                }
            }
        }
        this.data.map.forEach((col) => col.forEach((e) => e?.sync()));
        return isOperate;
    },
    async merge(x1: number, y1: number, x2: number, y2: number) {
        const blockA = this.data.map[x1][y1];
        const blockB = this.data.map[x2][y2];
        if (blockA && blockB && blockA.num === blockB.num) {
            await blockB.approaching(x1, y1);
            blockB.destroyed();
            // this.swap(x1, y1, x2, y2);
            // await Promise.all([blockA.sync(), blockB.sync()]);
            // await blockA.sync();
            // await blockB.sync();
            blockB.num *= 2;
            blockB.scale = 1.2;
            // await Promise.all([blockA.sync(), blockB.sync()]);
            return true;
        }
        return false;
    },
};

app.init();

setInterval(() => {
    app.draw();
}, 16);
