import { staticBlock } from "@babel/types";
import { log } from "console";

export function binaryFmt(binaryNum: number, len: number = 10) {
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

export function addBlock(blocks: number[]) {
    const newArr = [...blocks];
    newArr.unshift(0b0001100000);
    newArr.unshift(0b0001100000);
    newArr.pop();
    newArr.pop();
    return newArr;
}

export function moveDown(blocks: number[]) {
    const newArr = [...blocks];
    newArr.unshift(0b0000000000);
    newArr.pop();
    return newArr;
}

export function canMoveDown(blocks: number[], stickBlocks: number[]) {
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock > 0) {
        return false;
    }
    for (let i = stickBlocks.length - 1; i > 1; i--) {
        const stickBlock = stickBlocks[i];
        const block = blocks[i - 1];
        // if (i===8) {
        //   debugger;
        // }
        if (stickBlock & block) {
            return false;
        }
    }
    return true;
}

export function moveLeft(blocks: number[]) {
    const newArr = [...blocks.map((e) => e << 1)];
    return newArr;
}

export function canMoveLeft(blocks: number[], stickBlocks: number[]) {
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        // already reach left boundary
        if (b & 0b1000000000) {
            return false;
        }
        // left has stick block
    }
    return true;
}

export function moveRight(blocks: number[]) {
    const newArr = [...blocks.map((e) => e >> 1)];
    return newArr;
}

export function canMoveRight(blocks: number[], stickBlocks: number[]) {
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        if (b & 0b0000000001) {
            return false;
        }
    }
    return true;
}

export function mergeBlocks(blocks: number[], stickBlock: number[]) {
    const res: number[] = [];
    for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        res[i] = b | stickBlock[i];
    }
    return res;
}
