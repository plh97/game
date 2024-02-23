import {
    ADD_BLOCK,
    DOWN,
    EMPTY_BLOCK,
    INITIAL_SCREEN,
    MOVE_LEFT,
    MOVE_RIGHT,
    ROTATE,
} from "../constants";
import {
    addRandomBlock,
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    canRotateBlock,
    moveDown,
    moveLeft,
    moveRight,
    rotateBlock,
} from "../utils";

export interface BaseAction {
    readonly type: string;
}

export interface Action extends BaseAction {
    readonly bgBlock?: number[];
}

export const moveBlockReducer = (state: number[], action: Action) => {
    switch (action.type) {
        case INITIAL_SCREEN:
            return addRandomBlock(EMPTY_BLOCK);
        case ROTATE:
            if (canRotateBlock(state, action.bgBlock)) {
                return rotateBlock(state);
            }
            return state;
        case DOWN:
            if (canMoveDown(state, action?.bgBlock)) {
                return moveDown(state);
            }
            return addRandomBlock(EMPTY_BLOCK);
        case ADD_BLOCK:
            return addRandomBlock(EMPTY_BLOCK);
        case MOVE_LEFT:
            if (canMoveLeft(state, action?.bgBlock)) {
                return moveLeft(state);
            }
            return state;
        case MOVE_RIGHT:
            if (canMoveRight(state, action.bgBlock)) {
                return moveRight(state);
            }
            return state;
        default:
            return state;
    }
};
