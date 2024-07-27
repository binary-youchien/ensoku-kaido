import {NodeEntity} from "~/routes/roadmap/editor/NodeEntity";

export class Nodes {
  constructor(
    private readonly nodes: (NodeEntity | undefined)[][]
  ) {
  }

  columnSize() {
    return this.nodes.length
  }

  rowSize() {
    if (this.columnSize() <= 1) return 0
    return this.nodes[0].length
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

  copy() {
    return new Nodes(this.nodes)
  }
}