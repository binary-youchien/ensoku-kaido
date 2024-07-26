import {FetchBuilder, HTTPMethod} from "~/client/base";
import {IdRes} from "~/client/common";

export interface PostRoadmapBody {
  title: string
}

export namespace RoadmapClient {

  export async function post(postRoadmapBody: PostRoadmapBody) {
    return new FetchBuilder("/roadmap")
      .method(HTTPMethod.POST)
      .body(postRoadmapBody)
      .fetch<IdRes>()
  }

}
