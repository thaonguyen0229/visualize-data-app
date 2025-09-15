import { TableNode, TableColumn } from "../customNodes/TableNode";
import { Node } from "@xyflow/react";

export function jsonStringToTableNode(jsonString: string): Node {
    let table: TableNode = {
        id: '1',
        type:'tableNode',
        position: {
            x: 0,
            y: 0,
        },
        data: {
            tableName: 'root',
            columns: []
        }
    };
    const jsonObj = JSON.parse(jsonString);
    Object.keys(jsonObj).forEach((key) => {
        let col: TableColumn = {
            label: key,
            type: typeof jsonObj[key]
        }
        table.data.columns.push(col);
    });
    return table;
}