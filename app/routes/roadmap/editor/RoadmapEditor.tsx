import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {RoadmapRes} from "~/client/roadmapClient";
import {NodeRes} from "~/client/nodeClient";
import {useEffect, useState} from "react";
import {NodeState} from "~/mui/err/NodeState";
import {InitialNodeBuilder} from "~/mui/err/InitialNodeBuilder";

export function RoadmapEditor(
  {
    roadmapRes,
    nodesRes,
    ...props
  }: RoadmapEditorProps,
) {
  const [nodeState, setNodeState] = useState<NodeState>()

  useEffect(() => {
    setNodeState(new InitialNodeBuilder(roadmapRes, nodesRes).build(setNodeState))
  }, [roadmapRes, nodesRes]);

  return (
    <Box
      {...props}
    >
    </Box>
  )
}

export interface RoadmapEditorProps extends OverrideProps<BoxTypeMap, any> {
  roadmapRes: RoadmapRes
  nodesRes: NodeRes[]
}
