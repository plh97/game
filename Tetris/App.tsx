import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { useInterval } from "usehooks-ts";
import Block from "./components/Block";
import {
    ADD_BLOCK,
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
import { hasRepeatBlock } from "./utils/checkBlock";

function App() {
    const [speed, setSpeed] = useState(1000);
    const [moveBlock, moveBlockDispatch] = useReducer(moveBlockReducer, [
        ...EMPTY_BLOCK,
    ]);
    const [bgBlock, bgBlockDispatch] = useReducer(bgBlockReducer, [
        ...EMPTY_BLOCK,
    ]);
    const initGame = () => {
        bgBlockDispatch({ type: INITIAL_SCREEN });
        moveBlockDispatch({ type: INITIAL_SCREEN });
        moveBlockDispatch({ type: ADD_BLOCK, bgBlock });
    };
    useEffect(() => {
        initGame();
    }, []);
    useLayoutEffect(() => {
        if (hasRepeatBlock(moveBlock, bgBlock)) {
            setTimeout(() => {
                alert("游戏结束, 是否重新开始？");
                initGame();
            }, 0);
        }
    }, [bgBlock]);
    const combineDown = (_moveBlock = moveBlock) => {
        // 1. 判断是否有方块
        if (hasBlock(_moveBlock)) {
            // 2. 判断是否可以移动
            if (canMoveDown(_moveBlock, bgBlock)) {
                // 4. 下动方块
                moveBlockDispatch({ type: DOWN, bgBlock });
            } else {
                // 4. 不能移动，合并方块, 重新生成方块
                bgBlockDispatch({ type: MERGE_BLOCK, moveBlock: _moveBlock });
                moveBlockDispatch({ type: ADD_BLOCK, bgBlock });
            }
        }
    };
    useInterval(() => {
        combineDown();
    }, speed);
    useBindEvent({
        moveLeft: () => {
            moveBlockDispatch({ type: MOVE_LEFT, bgBlock });
        },
        moveRight: () => {
            moveBlockDispatch({ type: MOVE_RIGHT, bgBlock });
        },
        moveDown: () => {
            combineDown();
        },
        moveDownImmediate: () => {
            const newMoveBlock = moveLatest(moveBlock, bgBlock);
            combineDown(newMoveBlock);
        },
        rotate: () => {
            moveBlockDispatch({ type: ROTATE, bgBlock });
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
