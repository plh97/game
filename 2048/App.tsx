import React, { useEffect, useReducer, useState } from "react";
import Block from "./components/Block";
import { useBindEvent } from "./hooks";
import { reducer } from "./reducers";
import { ADD, CLEAN_STYLE, DOWN, INITIAL, LEFT, MERGE, MOVE, RIGHT, UP } from "./constants";

import { delay, isFull } from "./utils";
import "./styles.less";

function App() {
    const [block, dispatch] = useReducer(reducer, []);
    const initGame = () => {
        dispatch({ type: INITIAL });
        // dispatch({
        //     type: ADD, payload: {
        //         x: 0, y: 0, val: 2, color: "#eee4da", id: Math.random(), className: 'appear'
        //     }
        // });
        // dispatch({
        //     type: ADD, payload: {
        //         x: 0, y: 1, val: 2, color: "#eee4da", id: Math.random(), className: 'appear'
        //     }
        // });
        // dispatch({
        //     type: ADD, payload: {
        //         x: 0, y: 2, val: 4, color: "#eee4da", id: Math.random(), className: 'appear'
        //     }
        // });
        dispatch({
            type: ADD
        });
        dispatch({
            type: ADD
        });
        // dispatch({
        //     type: ADD, payload: {
        //         x: 0, y: 3, val: 2, color: "#eee4da", id: Math.random(), className: 'appear'
        //     }
        // });
        // dispatch({ type: ADD });
    };

    useEffect(() => {
        initGame();
    }, []);
    useBindEvent({
        move: async (dir: string) => {
            dispatch({ type: MOVE, payload: dir });
            await delay(200);
            if (!isFull(block)) {
                dispatch({ type: ADD });
            }
            await delay(200);
            dispatch({ type: CLEAN_STYLE });
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
