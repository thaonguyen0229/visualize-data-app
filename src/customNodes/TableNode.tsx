import { NodeProps, Node, Handle, Position } from '@xyflow/react';
import { Dialog } from '@mui/material'; 
import { useState } from 'react';

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
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    return (
        <div className='table-node'>
            <div className='table-name'>{props.data.tableName}</div>
            <Handle type='source' position={Position.Right} />
            <Handle type='target' position={Position.Left} />
            <div className='attributes-list'>
                {props.data.columns.map((column) => <div className='attribute-item'>{column.label} : {column.type}</div>)}
            </div>
            <button className='add-attribute-button' onClick={() => setIsOpenDialog(true)}>Add attribute</button>
            <Dialog onClose={() => setIsOpenDialog(false)} open={isOpenDialog}>testing</Dialog>
        </div>
    );
}