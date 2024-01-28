import { EMPTY_BLOCK } from "./constants";
import {
    addBlock,
    canMoveDown,
    canMoveLeft,
    canMoveRight,
    moveDown,
    moveLeft,
    moveRight,
} from "./utils";

export const reducer = (state, action) => {
    switch (action.type) {
        case "DOWN":
            if (canMoveDown(state, action.stickBlock)) {
                return moveDown(state);
            }
            return addBlock(EMPTY_BLOCK);
        case "ADD_BLOCK":
            return addBlock(EMPTY_BLOCK);
        case "MOVE_LEFT":
            if (canMoveLeft(state, action.stickBlock)) {
                return moveLeft(state);
            }
            return state;
        case "MOVE_RIGHT":
            if (canMoveRight(state)) {
                return moveRight(state);
            }
            return state;
        default:
            return state;
    }
};
