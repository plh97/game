import React from "react";
import Row from "./Row";
import classNames from "classnames";

interface IProps {
    data: number[][];
    className?: string;
}

function Block({ data, className }: IProps) {
    return (
        <div className={classNames("container", className)}>
            {data.map((row, i) => (
                <Row key={i} data={row} y={i} />
            ))}
        </div>
    );
}

export default Block;
