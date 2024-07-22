import {FetchBuilder} from "~/client/base";
import {IdRes} from "~/client/common";

export interface PostRoadmapBody {
  title: string
}

export interface PostNodeBody {
  title: string,
  description: string | undefined,
  condition: string | undefined,
  prevNodeId: string | undefined,
  nextNodeIds: string[],
}

export namespace roadmap {

  export async function post(postRoadmapBody: PostRoadmapBody) {
    return new FetchBuilder("/roadmap")
      .body(postRoadmapBody)
      .fetch<IdRes>()
  }

  export async function postNode(roadmapId: string, postNodeBody: PostNodeBody) {
    return new FetchBuilder(`/roadmap/${roadmapId}/node`)
      .body(postNodeBody)
      .fetch<IdRes>()
  }

}
