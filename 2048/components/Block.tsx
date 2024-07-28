import React from "react";
import { BLOCK_SIZE } from "../constants";
import { IBlock } from "../interface";
import classNames from "classnames";

interface IProps {
    data: IBlock[];
}

export default function Block({ data }: IProps) {
    return (
        <div className="container">
            {data.map(({ x, y, val, id, className, color }) => (
                <div
                    className={classNames('block', className)}
                    key={id}
                    data-id={id}
                    data-info={`val-${x}-${y}`}
                    style={{
                        transform: `translate(${x * BLOCK_SIZE}px, ${y * BLOCK_SIZE}px)`
                    }}
                >
                    <span
                        // className={classNames('', className)}
                        style={{
                            color
                        }}
                    >
                        {val ? val : ""}
                    </span>
                </div>
            ))}
        </div>
    );
}
