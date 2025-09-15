import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange } from '@xyflow/react';
import TableNode from './customNodes/TableNode';
import '@xyflow/react/dist/style.css';
 
const nodeTypes = {
  tableNode: TableNode,
};

const initialNodes = [
  { id: 'n1', type: 'tableNode', position: { x: 0, y: 0 }, data: { tableName: 'Table 1', columns: [{label: 'id', type: 'string'}, {label: 'name', type: 'string'}] } },
  { id: 'n2', type: 'tableNode', position: { x: 0, y: 100 }, data: { tableName: 'Table 2', columns: [{label: 'id2', type: 'string'}, {label: 'name2', type: 'string'}]} },
];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
 
  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );
  // const onConnect = useCallback(
  //   (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  //   [],
  // );
 
  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        // edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
      />
    </div>
  );
}