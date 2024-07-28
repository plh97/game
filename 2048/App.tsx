import React, { useEffect, useReducer, useRef, useState } from "react";
import Block from "./components/Block";
import { useBindEvent } from "./hooks";
import { initState, reducer } from "./reducers";
import {
    ADD,
    SET_RECORD,
    CLEAN_STYLE,
    INITIAL,
    MOVE,
    REDO,
    UNDO,
} from "./constants";

import { delay, isFull } from "./utils";
import "./styles.less";

function App() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { current: block, past, future } = state;
    const [moved, setMoved] = useState(0);
    const behaviousRef = useRef<string[]>([]);
    const initGame = () => {
        dispatch({ type: INITIAL });
        dispatch({
            type: ADD,
            payload: {
                x: 0,
                y: 0,
                val: 4,
                color: "#eee4da",
                id: Math.random(),
                className: "appear",
            },
        });
        dispatch({
            type: ADD,
            payload: {
                x: 3,
                y: 0,
                val: 4,
                color: "#eee4da",
                id: Math.random(),
                className: "appear",
            },
        });
        dispatch({
            type: ADD,
            payload: {
                x: 0,
                y: 1,
                val: 2,
                color: "#eee4da",
                id: Math.random(),
                className: "appear",
            },
        });
        dispatch({
            type: ADD,
            payload: {
                x: 3,
                y: 1,
                val: 2,
                color: "#eee4da",
                id: Math.random(),
                className: "appear",
            },
        });
        // dispatch({
        //     type: ADD, payload: {
        //         x: 0, y: 2, val: 4, color: "#eee4da", id: Math.random(), className: 'appear'
        //     }
        // });
        // dispatch({
        //     type: ADD
        // });
        // dispatch({
        //     type: ADD
        // });
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
            behaviousRef.current.push(JSON.stringify(block));
            dispatch({ type: MOVE, payload: dir });
            setMoved(Math.random());
        },
    });
    useEffect(() => {
        if (!moved) return;
        (async () => {
            const prevBlocks =
                behaviousRef.current[behaviousRef.current.length - 1];
            const isMoved =
                JSON.stringify(block) !==
                behaviousRef.current[behaviousRef.current.length - 1];
            if (!isFull(block) && isMoved) {
                dispatch({ type: ADD });
                dispatch({
                    type: SET_RECORD,
                    payload: {
                        past: [JSON.parse(prevBlocks), ...past],
                        future: [],
                    },
                });
            }
            await delay(200);
            dispatch({ type: CLEAN_STYLE });
        })();
    }, [moved]);
    return (
        <>
            <div className="page">
                {/* <BgBlock data={block} /> */}
                <Block data={block} />
            </div>
            <br />
            <center>
                <button
                    disabled={!past.length}
                    onClick={() => dispatch({ type: UNDO })}
                >
                    UN-DO
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    disabled={!future.length}
                    onClick={() => dispatch({ type: REDO })}
                >
                    RE-DO
                </button>
            </center>
        </>
    );
}

export default App;
