
/**
 * add block 🟥
 * @param {number[]} blocks
 * @return {*}
 */
function addBlock(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0000110000;
  newArr[1] = 0b0000110000;
  return newArr;
}

/**
* add block
* 🟥
* 🟥🟥
* 🟥
* @param {number[]} blocks
* @return {*}
*/
function addBlock1(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0001000000;
  newArr[1] = 0b0001100000;
  newArr[2] = 0b0001000000;
  return newArr;
}
/**
* add block
* 🟥
* 🟥🟥🟥🟥
* @param {number[]} blocks
* @return {*}
*/
function addBlock2(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0000100000;
  newArr[1] = 0b0000111000;
  return newArr;
}

/**
* add block
* 🟥🟥🟥🟥
* @param {number[]} blocks
* @return {*}
*/
function addBlock3(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0001111000;
  return newArr;
}

/**
* add block
* 🟥🟥🟥🟥
* @param {number[]} blocks
* @return {*}
*/
function addBlock4(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0001111000;
  return newArr;
}


/**
* add block
* 🟥🟥
*   🟥🟥
* @param {number[]} blocks
* @return {*}
*/
function addBlock5(blocks: number[]) {
  const newArr = [...blocks];
  newArr[0] = 0b0000110000;
  newArr[1] = 0b0000011000;
  return newArr;
}

export function addRandomBlock(blocks: number[]) {
  const fns = [addBlock, addBlock1, addBlock2, addBlock3, addBlock4, addBlock5];
  const fn = fns[Math.floor(Math.random() * fns.length)];
  return fn(blocks);
}

