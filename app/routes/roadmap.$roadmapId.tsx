import { LoaderFunction, json  } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { roadmap } from "~/client/roadmap";
import {PostNodeBody} from "~/client/roadmap";
import {base} from "~/client/base";
import ApiResult = base.ApiResult;


export const loader: LoaderFunction = async ({ params }) => {
  const roadmapId = params.roadmapId as string;
  const nodes = await roadmap.getNodes(roadmapId);

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