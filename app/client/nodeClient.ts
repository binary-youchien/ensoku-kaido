import {FetchBuilder, HTTPMethod} from "~/client/base";
import {IdRes} from "~/client/common";

export interface PostNodeBody {
  title: string,
  description: string | undefined,
  condition: string | undefined,
  prevNodeId: string | undefined,
  nextNodeIds: string[],
}

export enum NodePosition {
  RIGHT = "right",
  DOWN = "down"
}

export interface NodeResponse {
  id: string,
  roadmapId: string,
  position: string
  description: string | undefined
  condition: string | undefined
  prevNodeId: string | undefined
  nextNodeIds: string[]
}

export namespace NodeClient {
  export async function postNode(roadmapId: string, postNodeBody: PostNodeBody) {
    return await new FetchBuilder(`/roadmap/${roadmapId}/node`)
      .method(HTTPMethod.POST)
      .body(postNodeBody)
      .fetch<IdRes>()
  }

  export async function get(roadmapId: string) {
    return await new FetchBuilder(`/roadmap/${roadmapId}/node`)
      .method(HTTPMethod.GET)
      .fetch<NodeResponse[]>()
  }
}