// 7 kinds of blocks in tetris
// https://en.wikipedia.org/wiki/Tetris#:~:text=6%5D%5B7%5D-,Game%20pieces,-%5Bedit%5D

/**
 * add block l
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock1(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0000100000;
    newArr[1] = 0b0000100000;
    newArr[2] = 0b0000100000;
    newArr[3] = 0b0000100000;
    return newArr;
}

/**
 * add block
 *   🟥
 *   🟥
 * 🟥🟥
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock2(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0000010000;
    newArr[1] = 0b0000010000;
    newArr[2] = 0b0000110000;
    return newArr;
}

/**
 * add block L
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock3(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0000100000;
    newArr[1] = 0b0000100000;
    newArr[2] = 0b0000110000;
    return newArr;
}

/**
 * add block 🟥
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock4(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0000110000;
    newArr[1] = 0b0000110000;
    return newArr;
}

/**
 * add block
 *   🟥🟥
 * 🟥🟥
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock5(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0000110000;
    newArr[1] = 0b0001100000;
    return newArr;
}

/**
 * add block 凸
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock6(blocks: number[]) {
    const newArr = [...blocks];
    newArr[0] = 0b0001110000;
    newArr[1] = 0b0000100000;
    return newArr;
}


/**
 * add block Z
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock7(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0001100000;
  newArr[1] = 0b0000110000;
  return newArr;
}

export function addRandomBlock(blocks: number[]) {
    const fns = [
        addBlock1,
        addBlock2,
        addBlock3,
        addBlock4,
        addBlock5,
        addBlock6,
        addBlock7,
    ];
    const fn = fns[Math.floor(Math.random() * fns.length)];
    return fn(blocks);
}
