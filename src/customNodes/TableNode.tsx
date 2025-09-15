import { NodeProps, Node } from '@xyflow/react';

export type TableNode = Node<
    {
        tableName: string
    }
>;

export default function TableNode (props: NodeProps<TableNode>) {
    return (
        <div className='text-updater-node'>
            {props.data.tableName}
            <div>column 1</div>
            <div>column 2</div>
        </div>
    );
}