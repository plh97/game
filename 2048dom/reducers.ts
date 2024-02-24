import { ADD, DOWN, EMPTY_BLOCK, INITIAL, LEFT, RIGHT, UP } from "./constants";

export interface BaseAction {
    readonly type: string;
}

type GetNextFn = (x: number, y: number) => [number, number];

function inRange(x: number, y: number) {
    return x >= 0 && x < 4 && y >= 0 && y < 4;
}

function getNextUnZeroValue(
    matrix: number[][],
    x: number,
    y: number,
    getNextFn: GetNextFn
) {
    let [_x, _y] = getNextFn(x, y);
    while (!matrix[_x]?.[_y]) {
        if (!inRange(_x, _y)) {
            return undefined;
        }
        [_x, _y] = getNextFn(_x, _y);
    }
    return [_x, _y, matrix[_x][_y]];
}

// move single point
function calcPointMerge(
    matrix: number[][],
    x: number,
    y: number,
    getNext: GetNextFn
) {
    const [nX, nY, nVal] = getNextUnZeroValue(matrix, x, y, getNext) ?? [];
    if (nX === undefined) {
        // if no next unzero value, exit
        return matrix;
    }
    const currVal = matrix[x][y];
    if (currVal === 0) {
        // if current is 0, exchange with next unzero value
        [matrix[x][y], matrix[nX][nY]] = [nVal, currVal];
    } else {
        // if current is not 0, if equal to next unzero value, merge
        if (currVal === nVal) {
            matrix[x][y] *= 2;
            matrix[nX][nY] = 0;
        }
    }
    return matrix;
}

// move single column or row
function move(
    _matrix: number[][],
    [_x, _y]: number[],
    getNext: (x: number, y: number) => [number, number]
) {
    let [x, y] = [_x, _y];
    let matrix = _matrix.map((e) => [...e]);
    while (inRange(x, y)) {
        // should handle 2 times, first move and second merge in case
        matrix = calcPointMerge(matrix, x, y, getNext);
        matrix = calcPointMerge(matrix, x, y, getNext);
        [x, y] = getNext(x, y);
    }
    return matrix;
}

const moveFn: Record<string, GetNextFn> = {
    [LEFT]: (x: number, y: number) => [x, y + 1],
    [RIGHT]: (x: number, y: number) => [x, y - 1],
    [UP]: (x: number, y: number) => [x + 1, y],
    [DOWN]: (x: number, y: number) => [x - 1, y],
};

export const reducer = (state: number[][], action: BaseAction) => {
    switch (action.type) {
        case INITIAL:
            return [...EMPTY_BLOCK];
        case ADD:
            return state;
        case LEFT:
            for (let i = 0; i < 4; i++) {
                state = move(state, [i, 0], moveFn[action.type]);
            }
            return state;
        case RIGHT:
            for (let i = 0; i < 4; i++) {
                state = move(state, [i, 3], moveFn[action.type]);
            }
            return state;
        case UP:
            for (let i = 0; i < 4; i++) {
                state = move(state, [0, i], moveFn[action.type]);
            }
            return state;
        case DOWN:
            for (let i = 0; i < 4; i++) {
                state = move(state, [3, i], moveFn[action.type]);
            }
            return state;
        default:
            return state;
    }
};
