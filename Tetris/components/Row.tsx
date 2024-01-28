import React from "react";
import classnames from "classnames";
import { binaryFmt } from "../utils";

interface IProps {
    data: number;
    y: number;
}

function Row({ data, y }: IProps) {
    const _data = binaryFmt(data);
    return (
        <div className="row">
            {_data.map((col, x) => (
                <div
                    data-info={`${x}-${y}`}
                    key={x}
                    className={classnames(
                        "block-container",
                        +col ? "block" : ""
                    )}
                    style={{
                        top: y * 20,
                        left: x * 20,
                    }}
                />
            ))}
        </div>
    );
}

export default Row;
