import { NodeProps, Node, Handle, Position } from '@xyflow/react';

export type TableColumn = {
    label: string;
    type: string;
};

export type TableNode= Node<
    {
        tableName: string,
        columns: TableColumn[],
    }
>;

export default function TableNode (props: NodeProps<TableNode>) {
    return (
        <div className='table-node'>
            {props.data.tableName}
            {props.data.columns.map((column) => <div>{column.label} : {column.type}</div>)}
            <Handle type='source' position={Position.Right} />
            <Handle type='target' position={Position.Left} />
        </div>
    );
}