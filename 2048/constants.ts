export enum NUM_ENUM {
    TWO = 2,
    FOUR = 4,
    EIGHT = 8,
    SIXTEEN = 16,
    THIRTY_TWO = 32,
    SIXTY_FOUR = 64,
    ONE_HUNDRED_TWENTY_EIGHT = 128,
    TWO_HUNDRED_FIFTY_SIX = 256,
    FIVE_HUNDRED_TWELVE = 512,
    ONE_THOUSAND_AND_TWENTY_FOURTH = 1024,
    TWO_THOUSAND_AND_FORTY_EIGHTH = 2048,
}

export enum COLOR {
    BLACK = "#000",
    WHITE = "#fff",
    BACKGROUND = "#bbada0",
    TEXT_1 = "#776e65",
}

export const INITIAL = "INITIAL";
export const CLEAN_STYLE = "CLEAN_STYLE";
export const ADD = "ADD";
export const MOVE = "MOVE";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const MERGE = "MERGE";
export const UP = "UP";
export const DOWN = "DOWN";

export const BLOCK_SIZE = 100;

export const EMPTY_BLOCK = [
    [0, 0, 0, 0],
    [2, 2, 2, 2],
    [8, 4, 2, 2],
    [0, 0, 0, 2],
];
