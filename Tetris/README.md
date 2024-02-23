# Online Tetris link

[Tetris](https://game.plhh.xyz/tetris/)

## how to describe?
  
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

## Move left

`0b0000000000 >> 1`

## Move right

`0b0000000000 << 1`

## Move down

```ts
export function moveDown(blocks: number[]) {
    const newArr = [...blocks];
    newArr.unshift(0b0000000000);
    newArr.pop();
    return newArr;
}
```

## Remove
  `blocks = EMPTY_BLOCK`

## Rotate
  ```ts
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
  ```

## Add block
  ```ts
  function addBlock(blocks: number[]) {
    const newArr = [...EMPTY_BLOCK];
    newArr[0] = 0b0000110000;
    newArr[1] = 0b0000110000;
    return newArr;
  }
  ```


# Reference

[俄罗斯方块实现思路【渡一教育】](https://www.bilibili.com/video/BV1YG411z7V2/?spm_id_from=333.337.search-card.all.click&vd_source=87f758b0f5b48f523e2bb91356679759)
