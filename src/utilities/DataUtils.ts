import { TableNode, TableColumn } from "../customNodes/TableNode";
import { Node, Edge } from "@xyflow/react";

export function jsonStringToTableNode(jsonString: string): [Node[], Edge[]] {
    let rootTable: TableNode = {
        id: '0',
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
    let subTables: TableNode[] = [];
    let edges: Edge[] = [];
    const jsonObj = JSON.parse(jsonString);
    Object.keys(jsonObj).forEach((key) => {
        let col: TableColumn = {
            label: key,
            type: typeof jsonObj[key]
        }

        if (col.type == 'object')  {
            const tableNumber = subTables.length + 1;
            let newTable: TableNode = {
                id: tableNumber.toString() ,
                type:'tableNode',
                position: {
                    x: 200,
                    y: (tableNumber-1)*200,
                },
                data: {
                    tableName: key,
                    columns: []
                }
            }
            Object.keys(jsonObj[key]).forEach(subkey => {
                let subcol: TableColumn = {
                    label: subkey,
                    type: typeof jsonObj[key][subkey]
                };
                newTable.data.columns.push(subcol);
            });
            subTables.push(newTable);
            edges.push({
                id: rootTable.id + '-' + newTable.id,
                source: rootTable.id,
                target: newTable.id
            });
        }

        if (col.type != 'object') rootTable.data.columns.push(col);
    });
    return [[rootTable,...subTables], edges];
}