import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RoadmapClient, RoadmapRes } from "~/client/roadmapClient";
import { useEffect, useState } from "react";
import { useRoadmapState } from "~/routes/roadmap/RoadmapState";
import { NodeLoader } from "~/routes/node/NodeLoader";
import { Box } from "@mui/system";
import { Nodes } from "~/routes/node/Nodes";
import MyComponent from "~/routes/Roadmap_box";
import { Button } from "@mui/material";

export const loader: LoaderFunction = async ({ params }) => {
  const roadmapId = params.roadmapId as string;
  const roadmapResult = await RoadmapClient.get(roadmapId);
  return json(roadmapResult.value);
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
    <>
      <Box display="flex">
        {nodes.nodes.map((nodeColumn, index) => (
          <RoadmapViewColumn nodeColumn={nodeColumn} roadmapId={roadmap.id} key={index} />
        ))}
      </Box>
      <Button
        href={`/roadmap/${roadmap.id}/edit`}
        variant="contained"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 1000,
          textDecoration: 'none',
        }}
      >
        編集ページへ移動
      </Button>
    </>
  );
}

function RoadmapViewColumn({ nodeColumn }) {
  return (
    <Box>
      {nodeColumn.nodeEntities.map((nodeEntity, index) => (
        <NodeView nodeEntity={nodeEntity} key={index} />
      ))}
    </Box>
  );
}

function NodeView({ nodeEntity }) {
  if (nodeEntity == undefined) return <Box padding="20px" width="500px" height="216px"></Box>;
  if (nodeEntity.data.error) return <Box>Error: {nodeEntity.data.error.message}</Box>;

  const nodeRes = nodeEntity.data.nodeRes;
  return (
      <MyComponent nodeRes={nodeRes} />
  );
}