import {FetchBuilder, HTTPMethod} from "~/client/base";
import {IdRes} from "~/client/common";
import {ApiResult} from "~/client/result";

export interface PostRoadmapBody {
  title: string
}

export interface RoadmapRes {
  id: string
  title: string
  firstNodeId: string | undefined
}
export interface RoadmapScheme{
  title: string
  firstNodeId: string | undefined
}

export namespace RoadmapClient {

  export async function post(postRoadmapBody: PostRoadmapBody): Promise<ApiResult<IdRes>> {
    return await new FetchBuilder("/roadmap")
      .method(HTTPMethod.POST)
      .body(postRoadmapBody)
      .fetch<IdRes>()
  }

  export async function get(roadmapId: string): Promise<ApiResult<RoadmapRes>> {
    return await new FetchBuilder(`/roadmap/${roadmapId}`)
      .method(HTTPMethod.GET)
      .fetch<RoadmapRes>()
  }
  export async function put(roadmapId: string,roadmapScheme: RoadmapScheme) {
    return await new FetchBuilder(`/roadmap/${roadmapId}`)
      .method(HTTPMethod.POST)
      .body(roadmapScheme)
      .fetch()
  }

}
