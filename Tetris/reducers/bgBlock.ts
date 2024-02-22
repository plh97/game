import { CLEAN_ROW, MERGE_BLOCK } from "../constants";
import { cleanRow, mergeBlocks } from "../utils";

export interface BaseAction {
    readonly type: string;
}

export interface Action extends BaseAction {
    readonly moveBlock?: number[];
}

export const bgBlockReducer = (state: number[], action: Action) => {
    switch (action.type) {
        case CLEAN_ROW:
            return cleanRow(state);
        case MERGE_BLOCK:
            if (action.moveBlock) {
                return mergeBlocks(state, action.moveBlock);
            }
            return state;
        default:
            return state;
    }
};
