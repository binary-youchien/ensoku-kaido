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
  RIGHT,
  DOWN,
}

export interface NodeRes {
  id: string,
  roadmapId: string,
  title: string,
  position: string
  description: string | undefined
  condition: string | undefined
  prevNodeId: string | undefined
  downNodeId: string | undefined
  rightNodeId: string | undefined
}

export namespace NodeClient {
  export async function postNode(roadmapId: string, postNodeBody: PostNodeBody) {
    return await new FetchBuilder(`/roadmap/${roadmapId}/node`)
      .method(HTTPMethod.POST)
      .body(postNodeBody)
      .fetch<IdRes>()
  }

  export async function getAll(roadmapId: string) {
    return await new FetchBuilder(`/roadmap/${roadmapId}/node`)
      .method(HTTPMethod.GET)
      .fetch<NodeRes[]>()
  }

  export async function get(roadmapId: string, nodeId: string) {
    return await new FetchBuilder(`/roadmap/${roadmapId}/node/${nodeId}`)
      .method(HTTPMethod.GET)
      .fetch<NodeRes>()
  }

  export async function RoadMapGetAll(title?: string) {
    const queryParams = new URLSearchParams();
    if (title) {
      queryParams.append('title', title);
    }

    return await new FetchBuilder(`/roadmap${queryParams.toString() ? '?' + queryParams.toString() : ''}`)
      .method(HTTPMethod.GET)
      .fetch<NodeRes[]>()
  }
}