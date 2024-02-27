import React, { useEffect, useReducer, useState } from "react";
import Block from "./components/Block";
import { useBindEvent } from "./hooks";
import { reducer } from "./reducers";
import { ADD, DOWN, INITIAL, LEFT, MERGE, MOVE, RIGHT, UP } from "./constants";
import { BaseAction, IBlock } from "./interface";

import "./styles.less";
import { lastIndexOf } from "lodash";

function useMergeBlock(blocks: IBlock[], dispatch: React.Dispatch<BaseAction>) {
    useEffect(() => {
        dispatch({ type: MERGE });
    }, [blocks]);
}
function getRepeatBlock(blocks: IBlock[]) {
    const arr = blocks.map((e) => JSON.stringify(e));
    for (let i = 0; i < blocks.length; i++) {
        const curr = arr[i];
        console.log(arr);
        if (arr.lastIndexOf(curr) !== i) {
            return true;
        }
    }
    return false;
}

function App() {
    const [block, dispatch] = useReducer(reducer, []);
    const initGame = () => {
        dispatch({ type: INITIAL });
        dispatch({ type: ADD });
        dispatch({ type: ADD });
    };

    useEffect(() => {
        initGame();
    }, []);
    useMergeBlock(block, dispatch);
    useBindEvent({
        move: (dir: string) => {
            dispatch({ type: MOVE, payload: dir });
            if (getRepeatBlock(block)) {
                dispatch({ type: MERGE });
            }
            dispatch({ type: ADD });
        },
    });
    return (
        <div className="page">
            {/* <BgBlock data={block} /> */}
            <Block data={block} />
        </div>
    );
}

export default App;
