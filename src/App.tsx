import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, Node, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import TableNode from './customNodes/TableNode';
import '@xyflow/react/dist/style.css';
import { jsonStringToTableNode } from './utilities/DataUtils';
 
const nodeTypes = {
  tableNode: TableNode,
};

const initialNodes: Node[] = [
  { id: 'n1', type: 'tableNode', position: { x: 0, y: 0 }, data: { tableName: 'Table 1', columns: [{label: 'id', type: 'string'}, {label: 'name', type: 'string'}] } },
  { id: 'n2', type: 'tableNode', position: { x: 200, y: 0 }, data: { tableName: 'Table 2', columns: [{label: 'id2', type: 'string'}, {label: 'name2', type: 'string'}]} },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );
  // const onConnect = useCallback(
  //   (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  //   [],
  // );
  const onSubmit = useCallback(
    () => {
      const jsonString = (document.getElementById('jsonText')as HTMLTextAreaElement).value;
      const table = jsonStringToTableNode(jsonString);
      setNodes([table]);
    }, []
  );

 
  return (
    <div>
      <div style={{ width: '100vw', height: '100vh'}}>
        <textarea id='jsonText' rows={10} style={{width : '30vw'}} placeholder='Enter json'/>
        <button onClick={onSubmit}>Submit</button>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          fitView
        >
          <Background/>
          <Controls/>
        </ReactFlow>
      </div>
    </div>
  );
}