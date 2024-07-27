import {RoadmapClient, RoadmapRes} from "~/client/roadmapClient";
import {taskOrderQueueMap} from "~/entry.client";
import {util} from "~/util";
import {NodeEntity} from "~/routes/node/NodeEntity";

export class NodesUpdater {
  constructor(
    readonly setRoadmap: (nodeState: (prev: RoadmapRes) => RoadmapRes) => void,
  ) {
  }

  appendDown(prevNode: NodeEntity) {

  }

  setFirstNodeId(firstNodeId: string | undefined) {
    this.setRoadmap(prev => {
        prev.firstNodeId = firstNodeId
        taskOrderQueueMap.dispatchAsync(prev.id, async () => {
          await RoadmapClient.put(prev.id, prev)
        }).catch(reason => console.error(util.createErrorMessage(reason)))
        return {...prev}
      }
    )
  }
}