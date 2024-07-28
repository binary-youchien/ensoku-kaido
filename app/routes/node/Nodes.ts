import {NodeData, NodeEntity} from "~/routes/node/NodeEntity";
import {util} from "~/util";
import {NodeColumn} from "~/routes/node/NodeColumn";

export class Nodes {
  constructor(
    readonly nodes: NodeColumn[]
  ) {
  }

  columnCnt() {
    return this.nodes.length
  }

  rowCnt() {
    if (this.columnCnt() < 1) return 0
    return this.nodes[0].nodeEntities.length
  }

  getNodeRes(columnI: number, rowI: number) {
    const node = this.nodes[columnI].nodeEntities[rowI];

    if (node == undefined || node.data.error) {
      throw Error("invalid node state error: ", util.createErrorMessage(node))
    }
    return node.data.nodeRes;
  }

  set(columnI: number, rowI: number, node: NodeEntity) {
    if (this.columnCnt() <= columnI) {
      const column = new NodeColumn([])
      for (let i = 0; i <= columnI; i++) {
        column.nodeEntities.push(undefined)
      }
      this.nodes.push(column)
    }
    if (this.rowCnt() <= rowI) {
      this.nodes.forEach(value => {
        value.nodeEntities.push(undefined)
      })
    }
    this.nodes[columnI].nodeEntities[rowI] = node
  }

  setNode(columnI: number, rowI: number, nodeData: NodeData) {
    this.set(columnI, rowI, new NodeEntity(nodeData, columnI, rowI))
  }

  copy() {
    return new Nodes(this.nodes)
  }
}