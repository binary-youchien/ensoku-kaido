import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {NodeColumn} from "~/routes/node/NodeColumn";
import {NodesUpdater} from "~/routes/node/NodesUpdater";
import {NodeCardContainer} from "~/routes/node/NodeCardContainer";

export function RoadmapEditorColumn(
  {
    nodeColumn,
    nodeUpdater,
    ...props
  }: RoadmapEditorColumnProps,
) {
  return (
    <Box
      {...props}
    >
      {nodeColumn.nodeEntities.map((value, index) =>
        <NodeCardContainer nodeUpdater={nodeUpdater} nodeEntity={value} key={index}/>
      )}
    </Box>
  )
}

export interface RoadmapEditorColumnProps extends OverrideProps<BoxTypeMap, any> {
  nodeColumn: NodeColumn
  nodeUpdater: NodesUpdater
}
