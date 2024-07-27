import { LoaderFunction, json  } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {base} from "~/client/base";
import {PostNodeBody} from "~/client/nodeClient";
import {ApiResult} from "~/client/result";
import {RoadmapClient} from "~/client/roadmapClient";


export const loader: LoaderFunction = async ({ params }) => {
  const roadmapId = params.roadmapId as string;
  const nodes = await RoadmapClient.getNodes(roadmapId);

  return json(nodes);
}

export default function RoadmapRoadmapId() {
  const nodes: ApiResult<PostNodeBody[]> = useLoaderData<typeof loader>();

  if (nodes.error) {
    return (
      <div>
        <h1>No data available</h1>
        <p>{ nodes.error.message }</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {nodes.value.map((node) => (
          <li key={node.title}>
            <h1>{node.description || 'No description available'}</h1>
            <p>{node.condition || 'No condition available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}