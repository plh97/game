import { COL_LEN, ROW_LEN } from "../constants";
import { getBoundary } from "./getBoundary";

export * from "./addBlock";

export function binaryFmt(binaryNum: number, len: number = ROW_LEN) {
    const data = binaryNum.toString(2).split("");
    if (data.length < len) {
        const times = len - data.length;
        for (let i = 0; i < times; i++) {
            data.unshift("0");
        }
    }
    return data;
}
export function hasBlock(blocks: number[]) {
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        if (b > 0) {
            return true;
        }
    }
    return false;
}

export function moveDown(blocks: number[]) {
    const newArr = [...blocks];
    newArr.unshift(0);
    newArr.pop();
    return newArr;
}

export function moveLatest(blocks: number[], bgBlocks: number[]) {
    let newBlocks = [...blocks];
    while (canMoveDown(newBlocks, bgBlocks)) {
        newBlocks = moveDown(newBlocks);
    }
    return newBlocks;
}

export function canMoveDown(blocks: number[], bgBlocks?: number[]) {
    if (!bgBlocks) {
        return false;
    }
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock > 0) {
        return false;
    }
    for (let i = bgBlocks.length - 1; i > 1; i--) {
        const bgBlock = bgBlocks[i];
        const block = blocks[i - 1];
        if (bgBlock & block) {
            return false;
        }
    }
    return true;
}

export function moveLeft(blocks: number[]) {
    const newArr = [...blocks.map((e) => e << 1)];
    return newArr;
}

export function canMoveLeft(blocks: number[], bgBlocks?: number[]) {
    if (!bgBlocks) {
        return false;
    }
    for (let i = 0; i < blocks.length; i++) {
        const bgBlock = bgBlocks[i];
        const b = blocks[i];
        // already reach left boundary
        if (b & 0b1000000000) {
            return false;
        }
        // left has bg block
        if ((b << 1) & bgBlock) {
            return false;
        }
    }
    return true;
}

export function moveRight(blocks: number[]) {
    const newArr = [...blocks.map((e) => e >> 1)];
    return newArr;
}

export function canMoveRight(blocks: number[], bgBlocks?: number[]) {
    if (!bgBlocks) {
        return false;
    }
    for (let i = 0; i < blocks.length; i++) {
        const bgBlock = bgBlocks[i];
        const b = blocks[i];
        if (b & 0b0000000001) {
            return false;
        }
        if ((b >> 1) & bgBlock) {
            return false;
        }
    }
    return true;
}

export function mergeBlocks(blocks: number[], bgBlock: number[]) {
    const res: number[] = [];
    for (let i = 0; i < bgBlock.length; i++) {
        const b = blocks[i];
        res[i] = b | bgBlock[i];
    }
    return res;
}

export function cleanRow(bgBlock: number[]) {
    let res: number[] = [...bgBlock];
    res = res.filter((e) => e !== 0b1111111111);
    const len = bgBlock.length - res.length;
    res.unshift(...Array(len).fill(0b0000000000));
    return res;
}

function string2Binary(str: string) {
    return +("0b" + str);
}

export function rotateMatrix(matrix: number[][]) {
    const len = matrix.length;
    const temp: number[][] = [];
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            var k = len - 1 - j;
            if (!temp[k]) {
                temp[k] = [];
            }
            temp[k][i] = matrix[i][j];
        }
    }
    return temp;
}

export function canRotateBlock(blocks: number[], bgBlocks?: number[]) {
    if (!bgBlocks) {
        return false;
    }
    // 1. from '0000110000' to [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const matrix = blocks.map((block) => binaryFmt(block).map(Number));
    const bgMatrix = bgBlocks.map((block) => binaryFmt(block).map(Number));
    let temp: number[][] = [];
    // 2. get minimal square matrix
    const { top, left, bottom, right } = getBoundary(matrix);
    // 3. rotate this matrix
    const len = Math.max(bottom - top, right - left) + 1;
    const newMatrix = matrix
        .filter((_, i) => {
            return i >= top && i < len + top;
        })
        .map((row) => {
            return row.filter((_, i) => {
                return i >= left && i < len + left;
            });
        });
    temp = rotateMatrix(newMatrix);
    const x = top;
    const y = left;
    if (top + len > COL_LEN || left + len > ROW_LEN) {
        return false;
    }
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (bgMatrix[i + x][j + y] === 1 && temp[i][j] === 1) {
                return false;
            }
        }
    }
    return true;
}
export function rotateBlock(blocks: number[]) {
    // 1. from '0000110000' to [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const matrix = blocks.map((block) => binaryFmt(block).map(Number));
    let temp: number[][] = [];
    // 2. get minimal square matrix
    const { top, left, bottom, right } = getBoundary(matrix);
    // 3. rotate this matrix
    const len = Math.max(bottom - top, right - left) + 1;
    const newMatrix = matrix
        .filter((_, i) => {
            return i >= top && i < len + top;
        })
        .map((row) => {
            return row.filter((_, i) => {
                return i >= left && i < len + left;
            });
        });
    temp = rotateMatrix(newMatrix);
    const x = top;
    const y = left;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            matrix[i + x][j + y] = temp[i][j];
        }
    }
    // 4. assign back
    return matrix.map((row) => string2Binary(row.join("")));
}
