import { ADD, DOWN, INITIAL, LEFT, MERGE, MOVE, RIGHT, UP } from "./constants";
import { BaseAction, IBlock } from "./interface";
import { add, isFull, move, moveFn, pointFn } from "./utils";

function moveLine(matrix: IBlock[], direction: string) {
    for (let i = 0; i < 4; i++) {
        matrix = move(
            matrix,
            [i, direction === "up" ? 0 : 3],
            moveFn[direction]
        );
    }
    return matrix;
}

export const reducer = (state: IBlock[], action: BaseAction) => {
    switch (action.type) {
        case INITIAL:
            return [];
        case ADD:
            if (isFull(state)) {
                console.log("fulled");
                return state;
            }
            return [...state, add(state)];
        case MOVE:
            for (let i = 0; i < 4; i++) {
                state = move(
                    state,
                    pointFn[action.payload](i),
                    moveFn[action.payload]
                );
            }
            return state;
        case MERGE:
            console.log("merge");
            
            return state;
        default:
            return state;
    }
};
