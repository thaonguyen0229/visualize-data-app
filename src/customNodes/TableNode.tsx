import { NodeProps, Node } from '@xyflow/react';

export type TableColumn = {
    label: string;
    type: string;
};

export type TableNode = Node<
    {
        tableName: string,
        columns: TableColumn[],
    }
>;

export default function TableNode (props: NodeProps<TableNode>) {
    return (
        <div>
            {props.data.tableName}
            {props.data.columns.map((column) => <div>{column.label} : {column.type}</div>)}
        </div>
    );
}