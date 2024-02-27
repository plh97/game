import React from "react";
import { BLOCK_SIZE } from "../constants";
import { IBlock } from "../interface";

interface IProps {
    data: IBlock[];
}

export default function Block({ data }: IProps) {
    return (
        <div className="container">
            {data.map(({ x, y, val, id }, i) => (
                <div
                    className="block"
                    key={id}
                    data-info={`val-${x}-${y}`}
                    style={{
                        left: x * BLOCK_SIZE,
                        top: y * BLOCK_SIZE,
                    }}
                >
                    {val ? val : ""}
                </div>
            ))}
        </div>
    );
}
