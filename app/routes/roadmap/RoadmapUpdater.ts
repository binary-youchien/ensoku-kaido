import {RoadmapClient, RoadmapRes} from "~/client/roadmapClient";
import {taskOrderQueueMap} from "~/entry.client";
import {util} from "~/util";

export class RoadmapUpdater {
  constructor(
    readonly setRoadmap: (nodeState: (prev: RoadmapRes) => RoadmapRes) => void,
  ) {
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