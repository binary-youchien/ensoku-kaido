import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RoadmapClient, RoadmapRes } from "~/client/roadmapClient";
import {ApiResult, Results} from "~/client/result";
import { Nodes } from "~/routes/node/Nodes";
import { NodeLoader } from "~/routes/node/NodeLoader";
import { useState, useEffect } from "react";
import { useRoadmapState, RoadmapState } from "~/routes/roadmap/RoadmapState";

export const loader: LoaderFunction = async ({ params }) => {
  const roadmapId = params.roadmapId as string;
  const roadmapResult = await RoadmapClient.get(roadmapId);
  return json( roadmapResult.value );
};

export default function RoadmapRoadmapId() {
  const roadmap: RoadmapRes = useLoaderData<typeof loader>();
  const roadmapState = useRoadmapState(roadmap);

  const [nodes, setNodes] = useState<Nodes>(new Nodes([]));

  useEffect(() => {
    const nodeLoader = new NodeLoader(roadmapState, setNodes);

    return () => {
      nodeLoader.reset();
    };
  }, [roadmapState]);

  return (
    <div>
      <div>
        <h1>Roadmap Details</h1>
        <pre>{JSON.stringify(roadmap, null, 2)}</pre>
        <h2>Roadmap State</h2>
        <pre>{JSON.stringify(roadmapState, null, 2)}</pre>
        <h2>Nodes</h2>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
      </div>
      <h1>{roadmapState.roadmapRes.title}</h1>
      <div className="roadmap-grid">
        <div>Column size: {nodes.columnCnt()}
             Row size: {nodes.rowCnt()}
        </div>
        {Array.from({ length: nodes.columnCnt() }).map((_, columnIndex) => (
          <div key={columnIndex} className="roadmap-column">
            {Array.from({ length: nodes.rowCnt() }).map((_, rowIndex) => {
              const node = nodes.nodes[columnIndex]?.nodeEntities[rowIndex];
              return (
                <div key={`${columnIndex}-${rowIndex}`} className="roadmap-node">
                  {node ? (
                    node.data.nodeRes ? (
                      <div>{node.data.nodeRes.title || 'Unnamed Node'}</div>
                    ) : (
                      <div>Error: {node.data.error?.message}</div>
                    )
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>

  );
}