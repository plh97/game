const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

class Block {
    x: number;
    y: number;
    size: number;
    gutter: number;
    num: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.gutter = 5;
        this.size = 20;
        this.num = Math.random() > 0.5 ? 2 : 4;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.stroke();
    }
}

const app = {
    data: {
        blocks: [] as Block[],
        score: 0,
        width: 800,
    },
    init() {
        this.data.blocks.push(new Block(1, 2));
        this.drawBackground();
        this.drawBlock();
        this.bindEvent();
    },
    drawBackground() {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, this.data.width, this.data.width);
        ctx.stroke();
    },
    drawBlock() {
        this.data.blocks.forEach((block) => {
            block.draw();
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
