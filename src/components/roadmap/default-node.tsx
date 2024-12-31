import { memo, useState } from 'react';
import {
  Handle,
  NodeProps,
  Position,
  Node,
  useConnection,
  NodeToolbar,
  NodeResizer
} from '@xyflow/react';
import { Input } from '../ui/input';
import { useOutsideClick } from '@/hooks/use-outside-click';

export type DefaultNodeData = {
  label: string;
  resourceId: string;
  forceToolbarVisible?: boolean;
};
const DefNode = ({
  data,
  selected,
  isConnectable,
  id
}: NodeProps<Node<DefaultNodeData>>) => {
  const [newLabel, setNewLabel] = useState(data.label);
  const [isHovered, setIsHovered] = useState(false);
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const label = isTarget ? 'Drop here' : data.label;

  const handleLabelChange = () => {
    if (newLabel.trim()) {
      data.label = newLabel.trim();
    }
    data.forceToolbarVisible = false;
  };

  const ref = useOutsideClick(() => {
    handleLabelChange();
  });

  return (
    <>
      <NodeResizer
        handleClassName="rounded-md"
        lineClassName="rounded-md"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderStyle: isTarget ? 'dashed' : 'solid'
        }}
        className="rounded-md border-2 border-black bg-[#fdff00] px-8 py-2"
      >
        <NodeToolbar
          isVisible={data.forceToolbarVisible || undefined}
          position={Position.Top}
          className="flex flex-row gap-x-3 rounded-md border border-black bg-background px-4 py-2"
        >
          <div className="flex flex-row items-center gap-x-2">
            <label>Title</label>
            <Input
              className="text-lg font-medium"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={handleLabelChange}
            />
          </div>
        </NodeToolbar>
        <div className="text-lg font-medium">{label}</div>
        {!connection.inProgress && (
          <>
            <Handle
              type="source"
              position={Position.Top}
              id="def-source-top"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="def-source-bottom"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Left}
              id="def-source-left"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="def-source-right"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        {(!connection.inProgress || isTarget) && (
          <>
            <Handle
              type="target"
              position={Position.Top}
              id="def-target-top"
              isConnectableStart={false}
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="target"
              position={Position.Bottom}
              id="def-target-bottom"
              isConnectableStart={false}
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="def-target-left"
              isConnectableStart={false}
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
            <Handle
              type="target"
              position={Position.Right}
              id="def-target-right"
              isConnectableStart={false}
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 300ms ease-in-out',
                backgroundColor: '#1a5fff'
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
      </div>
    </>
  );
};

export const DefaultNode = memo(DefNode);
