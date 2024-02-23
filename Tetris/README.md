# Dev Step

1. how to express?
  2D Array like this
    ```js
    [
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000,
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000,
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000,
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000, 
        0b0000000000,
    ]
    ```

2. how to move
  move left:  `0b0000000000 >> 1`
  move right: `0b0000000000 << 1`

3. how to remove
  `blocks = EMPTY_BLOCK`

4. how to rotate
  ```ts
  export function rotateBlock(blocks: number[]) {
      const len = blocks.length;
      const matrix: number[][] = blocks.map((block) =>
          binaryFmt(block).map(Number)
      );
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
      return temp.map((row) => string2Binary(row.join("")));
  }
  ```

5. how to add block
  ```js
  function addBlock(blocks: number[]) {
    const newArr = [...EMPTY_BLOCK];
    newArr[0] = 0b0000110000;
    newArr[1] = 0b0000110000;
    return newArr;
  }
  ```


# Reference

[俄罗斯方块实现思路【渡一教育】](https://www.bilibili.com/video/BV1YG411z7V2/?spm_id_from=333.337.search-card.all.click&vd_source=87f758b0f5b48f523e2bb91356679759)
