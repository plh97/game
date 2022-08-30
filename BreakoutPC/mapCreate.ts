import MapJSON from "./map_standard.json";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const storeBtn = document.querySelector("#store-btn") as Element;
const cleanBtn = document.querySelector("#clean-btn") as Element;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

interface BLOCK {
    x: number;
    y: number;
    level: number;
    size: number;
}

class Brick {
    x: number;
    y: number;
    level: number;
    size: number;
    constructor(x: number, y: number, l = 3, size = 10) {
        this.x = x;
        this.y = y;
        this.level = l;
        this.size = size;
    }
    draw() {
        ctx.beginPath();
        if (this.level >= 3) {
            ctx.fillStyle = "#999";
        }
        if (this.level === 2) {
            ctx.fillStyle = "#e60109";
        }
        if (this.level === 1) {
            ctx.fillStyle = "#16ff05";
        }
        ctx.fillRect(this.x + 1, this.y + 1, this.size - 1, this.size - 1);
        ctx.stroke();
    }
}

const root = {
    constants: {
        BRICKS_MAP: "bricks_map",
    },
    map: {} as Record<string, boolean>,
    data: {
        bricks: [] as Brick[],
        refreshSpeed: 1,
        width: 1100,
        height: 600,
        timer: -1,
        rate: 1,
    },
    initMap() {
        let JsonString: string | null = localStorage.getItem(
            this.constants.BRICKS_MAP
        );
        let data: BLOCK[] = [];
        if (JsonString) {
            data = JSON.parse(JsonString) as BLOCK[];
        } else {
            data = MapJSON;
        }
        data.forEach((e) => {
            this.map[`${e.x / 10}_${e.y / 10}`] = true;
            this.data.bricks.push(new Brick(e.x, e.y, e.level, e.size));
        });
    },
    async init() {
        this.initMap();
        this.data.rate = canvas.offsetWidth / this.data.width;
        this.eventBind();
        canvas.width = this.data.width;
        canvas.height = this.data.height;
        this.data.timer = window.setInterval(() => {
            this.drawBackground();
            this.drawBrick();
        }, this.data.refreshSpeed);
    },
    drawBackground() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.data.width, this.data.height);
        ctx.stroke();
    },
    drawBrick() {
        this.data.bricks.forEach((brick) => brick.draw());
    },
    addBrick(e: MouseEvent) {
        const level = (
            document.querySelector("#brick-level") as HTMLInputElement
        ).value;
        const x = Math.floor(
            (e.pageX - canvas.getBoundingClientRect().x) / this.data.rate / 10
        );
        const y = Math.floor(
            (e.pageY - canvas.getBoundingClientRect().y) / this.data.rate / 10
        );
        if (!this.map[`${x}_${y}`]) {
            this.map[`${x}_${y}`] = true;
            this.data.bricks.push(new Brick(x * 10, y * 10, Number(level)));
        }
    },
    eventBind() {
        let isMouseDown = false;
        document.addEventListener("keydown", ($event) => {
            if ($event.metaKey && $event.code === "KeyZ") {
                const brick = this.data.bricks.pop();
                if (!brick) return;
                const { x, y } = brick;
                this.map[`${x / 10}_${y / 10}`] = false;
            }
        });
        canvas.addEventListener("mousedown", ($event) => {
            isMouseDown = true;
            this.addBrick($event);
        });
        canvas.addEventListener("mouseup", () => {
            isMouseDown = false;
        });
        canvas.addEventListener("mousemove", ($event) => {
            if (isMouseDown) {
                this.addBrick($event);
            }
        });
        cleanBtn.addEventListener("click", () => {
            this.data.bricks = [];
            localStorage.removeItem(this.constants.BRICKS_MAP);
        });
        storeBtn.addEventListener("click", () => {
            console.log(this.data.bricks);
            localStorage.setItem(
                this.constants.BRICKS_MAP,
                JSON.stringify(this.data.bricks)
            );
        });
    },
};

root.init();
