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
    // hasRepeatBlock,
    // canRotateBlock,
    moveDown,
    moveLeft,
    moveRight,
    rotateBlock,
} from "../utils";
import { hasRepeatBlock } from "../utils/checkBlock";

export interface BaseAction {
    readonly type: string;
}

export interface Action extends BaseAction {
    readonly bgBlock?: number[];
}

export const moveBlockReducer = (state: number[], action: Action) => {
    switch (action.type) {
        case INITIAL_SCREEN:
            return [...EMPTY_BLOCK];
        case ROTATE:
            try {
                const res = rotateBlock(state);
                if (!hasRepeatBlock(res, action.bgBlock)) {
                    return res;
                }
                return state;
            } catch (error) {
                console.log(error);
                return state;
            }
        case DOWN:
            if (canMoveDown(state, action?.bgBlock)) {
                return moveDown(state);
            }
            return [...EMPTY_BLOCK];
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
