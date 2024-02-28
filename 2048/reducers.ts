import { cloneDeep, find, remove } from "lodash";
import { ADD, CLEAN_STYLE, INITIAL, MERGE, MOVE } from "./constants";
import { BaseAction, IBlock } from "./interface";
import { add, isFull, move, moveFn, pointFn } from "./utils";

export const reducer = (state: IBlock[], action: BaseAction) => {
    switch (action.type) {
        case CLEAN_STYLE:
            return state.map((e) => ({
                ...e,
                className: undefined,
            }));
        case INITIAL:
            return [];
        case ADD:
            if (isFull(state)) {
                console.log("fulled");
                return state;
            }
            if (action.payload) {
                return [...state, action.payload];
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
            const newArr = cloneDeep(state);
            let i = state.length - 1;
            while (i > 0) {
                const currBlock = newArr[i];
                const firstBlock = find(newArr, function (o) {
                    return (
                        o.x == currBlock.x &&
                        o.y === currBlock.y &&
                        o.val === currBlock.val
                    );
                });
                if (firstBlock && firstBlock !== currBlock) {
                    currBlock.val *= 2;
                    remove(newArr, firstBlock);
                    i--;
                }
                i--;
            }
            return newArr;
        default:
            return state;
    }
};
