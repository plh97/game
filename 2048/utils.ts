import { cloneDeep } from "lodash";
import { DOWN, LEFT, RIGHT, UP } from "./constants";
import { GetNextFn, IBlock } from "./interface";

export function inRange(x: number, y: number) {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
}

export function getBlockFromBlockList(matrix: IBlock[], x: number, y: number) {
    return matrix.find((item) => item.x === x && item.y === y);
}

export function getNextUnZeroValue(
    matrix: IBlock[],
    x: number,
    y: number,
    getNextFn: GetNextFn
) {
    let [_x, _y] = getNextFn(x, y);
    while (!getBlockFromBlockList(matrix, _x, _y)) {
        if (!inRange(_x, _y)) {
            return undefined;
        }
        [_x, _y] = getNextFn(_x, _y);
    }
    return getBlockFromBlockList(matrix, _x, _y);
}

// move single point
export function calcPointMerge(
    _matrix: IBlock[],
    x: number,
    y: number,
    getNext: GetNextFn
) {
    let matrix = cloneDeep(_matrix);
    const nextBlock = getNextUnZeroValue(matrix, x, y, getNext);
    if (!nextBlock) {
        // if no next unzero value, exit
        return matrix;
    }
    const currBlock = getBlockFromBlockList(matrix, x, y);
    if (!currBlock) {
        // if current is 0, exchange with next unzero value
        nextBlock.x = x;
        nextBlock.y = y;
    } else {
        // if current is not 0, if equal to next unzero value, merge
        if (currBlock.val === nextBlock.val) {
            nextBlock.x = currBlock.x;
            nextBlock.y = currBlock.y;
            nextBlock.val *= 2;
            nextBlock.color = colorMap[nextBlock.val];
            nextBlock.className = "pop";
            matrix = matrix.filter((item) => item !== currBlock);
        }
    }
    return matrix;
}

// move single column or row
export function move(
    _matrix: IBlock[],
    [_x, _y]: number[],
    getNext: (x: number, y: number) => [number, number]
) {
    let [x, y] = [_x, _y];
    let matrix = [..._matrix];
    while (inRange(x, y)) {
        // should handle 2 times, first move and second merge in case
        matrix = calcPointMerge(matrix, x, y, getNext);
        // matrix = calcPointMerge(matrix, x, y, getNext);
        [x, y] = getNext(x, y);
    }
    return matrix;
}

export const moveFn: Record<string, GetNextFn> = {
    [LEFT]: (x: number, y: number) => [x + 1, y],
    [RIGHT]: (x: number, y: number) => [x - 1, y],
    [UP]: (x: number, y: number) => [x, y + 1],
    [DOWN]: (x: number, y: number) => [x, y - 1],
};

export const pointFn: Record<string, (i: number) => [number, number]> = {
    [LEFT]: (i) => [0, i],
    [RIGHT]: (i) => [3, i],
    [UP]: (i) => [i, 0],
    [DOWN]: (i) => [i, 3],
};

const random24 = () => {
    return ~~(Math.random() * 2) * 2 + 2;
};

const isExist = (blocks: IBlock[], { x, y }: { x: number; y: number }) => {
    return blocks.filter((e) => e).find((e) => e.x === x && e.y === y);
};

const random0123 = () => {
    return ~~(Math.random() * 4);
};

// 是否满了
export const isFull = (blocks: IBlock[]) => {
    return blocks.filter((e) => e).length > 15;
};

export function getRepeatBlock(blocks: IBlock[]) {
    const arr = blocks.map((e) => JSON.stringify(e));
    for (let i = 0; i < blocks.length; i++) {
        if (arr.lastIndexOf(arr[i]) !== i) {
            return true;
        }
    }
    return false;
}

const colorMap: Record<number, string> = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#0444BF",
    1024: "#A79674",
    2048: "#282726",
};

const num = (blocks: IBlock[]) => {
    const num = random24();
    const result = {
        x: random0123(),
        y: random0123(),
        val: num,
        id: Math.random(),
        color: colorMap[num],
        className: "appear",
    };
    const _isExist = isExist(blocks, {
        x: result.x,
        y: result.y,
    });
    if (_isExist) return;
    return result;
};

export const add = (blocks: IBlock[]): IBlock | undefined => {
    if (isFull(blocks)) {
        return;
    }
    const a = num(blocks);
    if (a) {
        return a;
    }
    return add(blocks);
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
