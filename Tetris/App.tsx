import React, { useEffect, useReducer, useState } from "react";
import { useInterval } from "usehooks-ts";
import Block from "./components/Block";
import { EMPTY_BLOCK } from "./constants";
import { canMoveDown, cleanRow, hasBlock, mergeBlocks } from "./utils";
import { useBindEvent } from "./hooks";
import { reducer } from "./reducer";

import "./styles.less";

function App() {
    const [speed, setSpeed] = useState(1000);
    const [moveBlock, dispatch] = useReducer(reducer, [...EMPTY_BLOCK]);
    const [stickBlock, setStickBlock] = useState([
        0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000,
        0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000,
        0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000,
        0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000, 0b0000000000,
    ]);
    useInterval(() => {
        if (!hasBlock(moveBlock)) {
            dispatch({ type: "ADD_BLOCK", stickBlock });
        } else {
            dispatch({ type: "DOWN", stickBlock });
        }
    }, speed);
    useEffect(() => {
        if (!canMoveDown(moveBlock, stickBlock)) {
            setStickBlock(mergeBlocks(moveBlock, stickBlock));
        }
    }, [moveBlock]);
    useEffect(() => {
        setStickBlock(cleanRow(stickBlock));
    }, [stickBlock]);
    useBindEvent({
        moveLeft: () => {
            dispatch({ type: "MOVE_LEFT", stickBlock });
        },
        moveRight: () => {
            dispatch({ type: "MOVE_RIGHT", stickBlock });
        },
        moveDown: () => {
            dispatch({ type: "DOWN", stickBlock });
        },
        rotate: () => {},
        moveDownImmediate: () => {},
    });
    return (
        <div className="page">
            <Block data={moveBlock} />
            <Block data={stickBlock} />
        </div>
    );
}

export default App;
