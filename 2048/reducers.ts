import { cloneDeep, find, remove } from "lodash";
import {
    ADD,
    SET_RECORD,
    CLEAN_STYLE,
    INITIAL,
    MERGE,
    MOVE,
    REDO,
    UNDO,
} from "./constants";
import { BaseAction, IBlock } from "./interface";
import { add, isFull, move, moveFn, pointFn } from "./utils";

export const initState: IState = {
    past: [],
    current: [],
    future: [],
};

interface IState {
    past: IState["current"][];
    current: IBlock[];
    future: IState["current"][];
}

export const reducer = (state: IState, action: BaseAction) => {
    switch (action.type) {
        case CLEAN_STYLE:
            return {
                ...state,
                current: state.current.map((e) => ({
                    ...e,
                    className: undefined,
                })),
            };
        case INITIAL:
            return initState;
        case ADD:
            if (isFull(state.current)) {
                console.log("fulled");
                return state;
            }
            if (action.payload) {
                return {
                    ...state,
                    current: [...state.current, action.payload],
                };
            }
            return {
                ...state,
                current: [...state.current, add(state.current)],
            };
        case MOVE:
            for (let i = 0; i < 4; i++) {
                state.current = move(
                    state.current,
                    pointFn[action.payload](i),
                    moveFn[action.payload]
                );
            }
            return state;
        case MERGE:
            const newArr = cloneDeep(state.current);
            let i = state.current.length - 1;
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
            return {
                ...state,
                current: newArr,
            };
        case UNDO:
            if (state.past.length === 0) {
                console.log("cannot undo");
                return state;
            }
            const lastBlock = state.past[0];
            return {
                past: state.past.filter((_, i) => i !== 0),
                current: lastBlock,
                future: [state.current, ...state.future],
            };
        case REDO:
            if (state.future.length === 0) {
                console.log("cannot redo");
                return state;
            }
            const nextBlock = state.future[0];
            return {
                past: [state.current, ...state.past],
                current: nextBlock,
                future: state.future.filter((_, i) => i !== 0),
            };
        case SET_RECORD:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
