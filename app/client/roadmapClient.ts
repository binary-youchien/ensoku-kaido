import {FetchBuilder, HTTPMethod} from "~/client/base";
import {IdRes} from "~/client/common";

export interface PostRoadmapBody {
  title: string
}

export interface RoadmapRes {
  id: string
  title: string
  firstNodeId: string
}

export namespace RoadmapClient {

  export async function post(postRoadmapBody: PostRoadmapBody) {
    return new FetchBuilder("/roadmap")
      .method(HTTPMethod.POST)
      .body(postRoadmapBody)
      .fetch<IdRes>()
  }

  export async function get(roadmapId: string) {
    return new FetchBuilder(`/roadmap/${roadmapId}`)
      .method(HTTPMethod.GET)
      .fetch<RoadmapRes>()
  }
}
