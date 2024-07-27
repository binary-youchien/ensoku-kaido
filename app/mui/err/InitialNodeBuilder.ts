import {RoadmapRes} from "~/client/roadmapClient";
import {NodePosition, NodeRes} from "~/client/nodeClient";
import {NodeState} from "~/mui/err/NodeState";

export class InitialNodeBuilder {
  private readonly nodes: (NodeRes | undefined)[][] = []

  constructor(
    roadmap: RoadmapRes,
    readonly srcNodes: NodeRes []
  ) {
    const id = roadmap.firstNodeId
    if (id == undefined) return
    this.nodes.push([this.findNode(id)])
    this.pushNext(0, 0, id)
  }

  build(setNodeState: (nodeState: NodeState) => void) {
    return new NodeState(this.nodes, setNodeState)
  }

  private pushNext(columnI: number, rowI: number, id: string) {
    this.srcNodes.forEach(value => {
      if (value.prevNodeId != id) return

      if (value.position == NodePosition.DOWN.toString()) this.pushToNodes(columnI, rowI + 1, value)
      else this.pushToNodes(columnI + 1, rowI, value)
    })
  }

  private pushToNodes(columnI: number, rowI: number, node: NodeRes) {
    const columnLength = this.nodes.length
    const rowLength = this.nodes[0].length
    if (columnLength <= columnI) {
      const column: (NodeRes | undefined)[] = []
      for (let i = 0; i <= columnI; i++) {
        column.push(undefined)
      }
      this.nodes.push(column)
    }
    if (rowLength <= rowI) {
      this.nodes.forEach(value => {
        value.push(undefined)
      })
    }
    this.nodes[columnI][rowI] = node
    this.pushNext(columnI, rowI, node.id)
  }

  private findNode(id: string): NodeRes {
    const node = this.srcNodes.find(value => value.id == id)
    if (node == undefined) throw new NodeError(`ノードが見つかりません: ${id}`)
    return node
  }
}

export class NodeError extends Error {
}