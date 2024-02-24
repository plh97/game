import React, { useEffect, useReducer } from "react";
import Block from "./components/Block";
// import BgBlock from "./components/BgBlock";
import { useBindEvent } from "./hooks";
import { reducer } from "./reducers";
import { DOWN, EMPTY_BLOCK, INITIAL, LEFT, MOVE, RIGHT, UP } from "./constants";

import "./styles.less";

function App() {
    const [block, dispatch] = useReducer(reducer, [...EMPTY_BLOCK]);
    const initGame = () => {
        dispatch({ type: INITIAL });
    };
    useEffect(() => {
        initGame();
    }, []);
    useBindEvent({
        moveLeft: () => {
            dispatch({ type: LEFT });
        },
        moveRight: () => {
            dispatch({ type: RIGHT });
        },
        moveDown: () => {
            dispatch({ type: DOWN });
        },
        moveUp: () => {
            dispatch({ type: UP });
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
