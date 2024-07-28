import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {RoadmapState} from "~/routes/roadmap/RoadmapState";
import {useNodesState} from "~/routes/node/NodesState";
import {useEffect, useMemo} from "react";
import {NodeLoader} from "~/routes/node/NodeLoader";
import {RoadmapEditorColumn} from "~/routes/roadmap/editor/RoadmapEditorColumn";
import {NodesUpdater} from "~/routes/node/NodesUpdater";

export function RoadmapEditor(
  {
    roadmapState,
    ...props
  }: RoadmapEditorProps,
) {
  const nodesState = useNodesState(roadmapState.roadmapRes.id)

  useEffect(() => {
    new NodeLoader(roadmapState, nodesState.updater.setNodes)
  }, []);
  const nodeUpdater = useMemo(() => {
    return new NodesUpdater(nodesState.updater.setNodes, roadmapState.roadmapRes.id)
  }, [roadmapState.roadmapRes.id]);
  return (
    <Box
      displayPrint={"flex"}
      {...props}
      display={"flex"}
    >
      {nodesState.nodes.nodes.map((value, index) =>
        <RoadmapEditorColumn nodeUpdater={nodeUpdater} nodeColumn={value} key={index}/>
      )}
    </Box>
  )
}

export interface RoadmapEditorProps extends OverrideProps<BoxTypeMap, any> {
  roadmapState: RoadmapState
}
