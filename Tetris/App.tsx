import React, { useEffect, useReducer, useState } from "react";
import { useInterval } from "usehooks-ts";
import Block from "./components/Block";
import {
    ADD_BLOCK,
    CLEAN_ROW,
    DOWN,
    EMPTY_BLOCK,
    INITIAL_SCREEN,
    MERGE_BLOCK,
    MOVE_LEFT,
    MOVE_RIGHT,
    ROTATE,
} from "./constants";
import { canMoveDown, hasBlock, moveLatest } from "./utils";
import { useBindEvent } from "./hooks";
import { moveBlockReducer } from "./reducers/moveBlock";
import { bgBlockReducer } from "./reducers/bgBlock";

import "./styles.less";

function App() {
    const [speed, setSpeed] = useState(1000);
    const [moveBlock, moveBlockDispatch] = useReducer(moveBlockReducer, [
        ...EMPTY_BLOCK,
    ]);
    const [bgBlock, bgBlockDispatch] = useReducer(bgBlockReducer, [
        ...EMPTY_BLOCK,
    ]);
    useInterval(() => {
        if (!canMoveDown(moveBlock, bgBlock)) {
            bgBlockDispatch({ type: MERGE_BLOCK, moveBlock });
        }
        if (!hasBlock(moveBlock)) {
            moveBlockDispatch({ type: ADD_BLOCK, bgBlock });
        } else {
            moveBlockDispatch({ type: DOWN, bgBlock });
        }
    }, speed);
    useBindEvent({
        moveLeft: () => {
            moveBlockDispatch({ type: MOVE_LEFT, bgBlock });
        },
        moveRight: () => {
            moveBlockDispatch({ type: MOVE_RIGHT, bgBlock });
        },
        moveDown: () => {
            moveBlockDispatch({ type: DOWN, bgBlock });
            if (!canMoveDown(moveBlock, bgBlock)) {
                bgBlockDispatch({ type: MERGE_BLOCK, moveBlock });
            }
        },
        moveDownImmediate: () => {
            const newMoveBlock = moveLatest(moveBlock, bgBlock);
            moveBlockDispatch({ type: INITIAL_SCREEN });
            bgBlockDispatch({ type: MERGE_BLOCK, moveBlock: newMoveBlock });
        },
        rotate: () => {
            moveBlockDispatch({ type: ROTATE });
        },
    });
    return (
        <div className="page">
            <Block data={moveBlock} />
            <Block className="bg" data={bgBlock} />
        </div>
    );
}

export default App;
