import React, { useEffect, useReducer, useRef, useState } from "react";
import Block from "./components/Block";
import { useBindEvent } from "./hooks";
import { reducer } from "./reducers";
import { ADD, CLEAN_STYLE, INITIAL, MOVE } from "./constants";

import { delay, isFull } from "./utils";
import "./styles.less";

function App() {
    const [block, dispatch] = useReducer(reducer, []);
    const [moved, setMoved] = useState(0);
    const behaviousRef = useRef<string[]>([]);
    const initGame = () => {
        dispatch({ type: INITIAL });
        dispatch({
            type: ADD, payload: {
                x: 0, y: 0, val: 4, color: "#eee4da", id: Math.random(), className: 'appear'
            }
        });
        dispatch({
            type: ADD, payload: {
                x: 3, y: 0, val: 4, color: "#eee4da", id: Math.random(), className: 'appear'
            }
        });
        dispatch({
            type: ADD, payload: {
                x: 0, y: 1, val: 2, color: "#eee4da", id: Math.random(), className: 'appear'
            }
        });
        dispatch({
            type: ADD, payload: {
                x: 3, y: 1, val: 2, color: "#eee4da", id: Math.random(), className: 'appear'
            }
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
            behaviousRef.current.push(JSON.stringify(block))
            dispatch({ type: MOVE, payload: dir });
            setMoved(Math.random());
        },
    });
    useEffect(()=> {
        if (!moved) return;
        (async() => {
            console.log('change');
            const isMoved = JSON.stringify(block) !== behaviousRef.current[behaviousRef.current.length - 1];
            if (!isFull(block) && isMoved) {
                dispatch({ type: ADD });
            }
            await delay(200);
            dispatch({ type: CLEAN_STYLE });
        })()
    }, [moved])
    return (
        <div className="page">
            {/* <BgBlock data={block} /> */}
            <Block data={block} />
        </div>
    );
}

export default App;
