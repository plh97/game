import React from "react";
import Row from "./Row";

interface IProps {
    data: number[];
}

function Block({ data }: IProps) {
    return (
        <div className="container">
            {data.map((row, i) => (
                <Row key={i} data={row} y={i} />
            ))}
        </div>
    );
}

export default Block;
