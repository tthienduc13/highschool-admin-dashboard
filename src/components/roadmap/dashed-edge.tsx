import React, { memo } from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';

function Edge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <path
      id={id}
      style={{
        ...style,
        strokeDasharray: '5, 5',
        strokeWidth: 2
      }}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
}

export const DashedEdge = memo(Edge);
