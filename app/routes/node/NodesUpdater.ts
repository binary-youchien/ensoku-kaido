import {taskOrderQueueMap} from "~/entry.client";
import {NodeEntity} from "~/routes/node/NodeEntity";
import {Nodes} from "~/routes/node/Nodes";
import {NodeClient} from "~/client/nodeClient";

export class NodesUpdater {

  constructor(
    readonly setNodes: (nodeState: (prev: Nodes) => Nodes) => void,
    readonly roadmapId: string
  ) {
  }

  append(
    parentNode: NodeEntity,
    description: string | undefined,
    condition: string | undefined,
    title: string,
    position: "down" | "right"
  ) {
    if (parentNode.data.error) {
      throw Error("invalid node state error")
    }
    const parentNodeRes = parentNode.data.nodeRes
    taskOrderQueueMap.dispatch(parentNodeRes.roadmapId, async () => {
      if (this.roadmapId != parentNodeRes.roadmapId) {
        throw new Error("different romapId")
      }
      const promises: Promise<any>[] = []
      const result = await NodeClient.postNode(this.roadmapId, {
        condition: condition, description: description, downNodeId: undefined,
        rightNodeId: undefined, prevNodeId: this.roadmapId, title: title
      })
      this.setNodes(prev => {
        const prevNodeRes = prev.getNodeRes(parentNode.column, parentNode.row)
        if (result.error) {
          prev.setNode(parentNode.column, parentNode.row, {error: result.error})
          return prev.copy()
        }
        promises.push(NodeClient.put(this.roadmapId, prevNodeRes.id, {
          downNodeId: position == "down" ? result.value.id : prevNodeRes.downNodeId, condition: prevNodeRes.condition,
          description: prevNodeRes.description,
          rightNodeId: position == "right" ? result.value.id : prevNodeRes.rightNodeId, title: prevNodeRes.title
        }))
        if (position == "down") prevNodeRes.downNodeId = result.value.id
        else prevNodeRes.rightNodeId = result.value.id
        return prev.copy()
      })
      await Promise.all(promises)
    })
  }

}