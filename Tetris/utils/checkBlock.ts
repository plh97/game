
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


export function hasRepeatBlock(blocks: number[], bgBlock?: number[]) {
  if (!bgBlock) {
      return false;
  }
  for (let i = 0; i < bgBlock.length; i++) {
      const bg = bgBlock[i];
      const block = blocks[i];
      if (bg & block) {
          return true;
      }
  }
  return false;
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