import {NodeData, NodeEntity} from "~/routes/node/NodeEntity";
import {util} from "~/util";

export class Nodes {
  constructor(
    readonly nodes: (NodeEntity | undefined)[][]
  ) {
  }

  columnSize() {
    return this.nodes.length
  }

  rowSize() {
    if (this.columnSize() < 1) return 0
    return this.nodes[0].length
  }

  getNodeRes(columnI: number, rowI: number) {
    const node = this.nodes[columnI][rowI];

    if (node == undefined || node.data.error) {
      throw Error("invalid node state error: ", util.createErrorMessage(node))
    }
    return node.data.nodeRes;
  }

  set(columnI: number, rowI: number, node: NodeEntity) {
    if (this.columnSize() <= columnI) {
      const column: (NodeEntity | undefined)[] = []
      for (let i = 0; i <= columnI; i++) {
        column.push(undefined)
      }
      this.nodes.push(column)
    }
    if (this.rowSize() <= rowI) {
      this.nodes.forEach(value => {
        value.push(undefined)
      })
    }
    this.nodes[columnI][rowI] = node
  }

  setNode(columnI: number, rowI: number, nodeData: NodeData) {
    this.set(columnI, rowI, new NodeEntity(nodeData, columnI, rowI))
  }

  copy() {
    return new Nodes(this.nodes)
  }
}