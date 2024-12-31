import React from "react";
import { ConnectionLineComponentProps } from "@xyflow/react";

// Named function component
function CustomConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
}: ConnectionLineComponentProps) {
    return (
        <g>
            <path
                fill="none"
                stroke={"#1a5fff"}
                strokeWidth={1.5}
                className="animated"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                stroke={"#1a5fff"}
                strokeWidth={1.5}
            />
        </g>
    );
}

export default CustomConnectionLine;
