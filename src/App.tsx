import { useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, Node, applyNodeChanges } from '@xyflow/react';
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
      const jsonString = (document.getElementById('json-text')as HTMLTextAreaElement).value;
      const [tables, edges] = jsonStringToTableNode(jsonString);
      setNodes(tables);
      setEdges(edges);
    }, []
  );

  const onFileUpload = useCallback(
    () => {
      const fileInputEle = document.getElementById('json-file') as HTMLInputElement;
      const textAreaEle = document.getElementById('json-text') as HTMLTextAreaElement;
      const files = fileInputEle.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => textAreaEle.value = (reader.result as string) ?? '';
        reader.readAsText(files[0])
      }
    }, []
  );

  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row'}}>
      <div className='side-bar'>
        <label htmlFor='json-file'>Upload a JSON file:</label>
        <input type="file" id='json-file' name='json-file' accept='.json' multiple={false} onChange={onFileUpload} />
        <textarea id='json-text' rows={10} placeholder='Enter json'/>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div className='design-view'>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
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