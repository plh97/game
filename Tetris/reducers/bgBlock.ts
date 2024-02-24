import {
    CLEAN_ROW,
    EMPTY_BLOCK,
    INITIAL_SCREEN,
    MERGE_BLOCK,
} from "../constants";
import { cleanRow, mergeBlocks } from "../utils";

export interface BaseAction {
    readonly type: string;
}

export interface Action extends BaseAction {
    readonly moveBlock?: number[];
}

export const bgBlockReducer = (state: number[], action: Action) => {
    switch (action.type) {
        case INITIAL_SCREEN:
            return [...EMPTY_BLOCK];
        case CLEAN_ROW:
            return cleanRow(state);
        case MERGE_BLOCK:
            if (action.moveBlock) {
                const mergedBlock = mergeBlocks(state, action.moveBlock);
                return cleanRow(mergedBlock);
            }
            return state;
        default:
            return state;
    }
};
