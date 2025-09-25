import { TableNode, TableColumn } from "../customNodes/TableNode";
import { Node, Edge } from "@xyflow/react";

export function jsonStringToTableNode(jsonString: string): [Node[], Edge[]] {
    const jsonObj = JSON.parse(jsonString);
    const tableName = 'root';
    const rootId = '0';
    const rootPosition = {x: 0, y: 0};
    const result = jsonToTable(jsonObj, rootId, tableName, rootPosition);
    return result;
}

function jsonToTable(jsonObj: any, id: string, name: string, position: {x: number, y: number}): [Node[], Edge[]] {
    let newTable: TableNode = {
        id: id,
        type: 'tableNode',
        position: position,
        data: {
            tableName: name,
            columns: []
        }
    };
    let otherTables: Node[] = [];
    let edges: Edge[] = [];
    let nextId = Number(id) + 1;
    let nextTablePostion = {x: position.x + 200, y: position.y}

    Object.keys(jsonObj).forEach((key) => {
        let col: TableColumn = {
            label: key,
            type: typeof jsonObj[key]
        }

        if (col.type == 'object')  {
            const [subTables, subEdges] = jsonToTable(jsonObj[key], nextId.toString(), col.label, nextTablePostion);
            otherTables = [...otherTables, ...subTables];
            edges = [...edges, ...subEdges];
            edges.push({
                id: id + "-" + nextId.toString(),
                source: id,
                target: nextId.toString()
            });

            nextId = nextId + otherTables.length + 1;
            nextTablePostion = {x: nextTablePostion.x, y: nextTablePostion.y + 200}
        }
        newTable.data.columns.push(col);
    });
    return [[newTable, ...otherTables],edges];

}