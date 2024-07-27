import {NodeClient} from "~/client/nodeClient";
import {Nodes} from "~/routes/node/Nodes";
import {RoadmapState} from "~/routes/roadmap/RoadmapState";
import {taskOrderQueueMap} from "~/entry.client";
import {TaskOrderQueue} from "~/util/TaskOrderQueueMap";
import {NodeData, NodeEntity} from "~/routes/node/NodeEntity";

export class NodeLoader {
  readonly roadmapQueue: TaskOrderQueue

  constructor(
    readonly roadmapState: RoadmapState,
    readonly setNodes: (nodeState: (prev: Nodes) => Nodes) => void
  ) {
    this.roadmapQueue = new TaskOrderQueue(this.roadmapState.roadmapRes.id, taskOrderQueueMap)
    this.roadmapQueue.dispatch(async () => {
      if (roadmapState.roadmapRes.firstNodeId)
        await this.loadNode(0, 0, roadmapState.roadmapRes.firstNodeId)
    })
  }

  private async loadNode(columnI: number, rowI: number, id: string) {
    const result = await NodeClient.get(this.roadmapState.roadmapRes.id, id)
    if (result.error) {
      this.setNode(columnI, rowI, {error: result.error})
      return
    }
    this.setNode(columnI, rowI, {nodeRes: result.value})

    const promises = []
    if (result.value.downNodeId) {
      promises.push(this.loadNode(columnI, rowI + 1, result.value.downNodeId))
    }
    if (result.value.rightNodeId) {
      promises.push(this.loadNode(columnI + 1, rowI, result.value.rightNodeId))
    }
    await Promise.all(promises)
  }

  private setNode(columnI: number, rowI: number, nodeData: NodeData) {
    this.setNodes(prev => {
      prev.setNode(columnI, rowI, nodeData)
      return prev.copy()
    })
  }

  reset() {
    this.roadmapQueue.dispatch(() => {
      this.roadmapState.updater.setFirstNodeId(undefined)
      this.setNodes(() => new Nodes([]))
    })
  }
}
