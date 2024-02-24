import React from "react";
import { BLOCK_SIZE } from "../constants";

interface IProps {
    data: number[];
    y: number;
}

function Row({ data, y }: IProps) {
    return (
        <div className="row">
            {data.map((col, x) => (
                <div
                    className="block-container"
                    key={x}
                    style={{
                        top: y * BLOCK_SIZE,
                        left: x * BLOCK_SIZE,
                    }}
                >
                    {col ? col : ""}
                </div>
            ))}
        </div>
    );
}

export default Row;
