import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {NodeEntity} from "~/routes/node/NodeEntity";
import {ErrorMessage} from "~/mui/err/ErrorMessage";
import {Button} from "@mui/material";
import {NodesUpdater} from "~/routes/node/NodesUpdater";

export function NodeCardContainer(
  {
    nodeEntity,
    nodeUpdater,
    ...props
  }: NodeCardProps,
) {
  if (nodeEntity == undefined) return <Box
    width={"90px"} height={"90px"}
  ></Box>
  if (nodeEntity.data.error) return <ErrorMessage error={nodeEntity.data.error?.message}/>
  const nodeRes = nodeEntity.data.nodeRes
  return <Box
    paddingLeft={"20px"}
    display={"flex"}
  >
    <Box paddingTop={"20px"}>
      <Box
        bgcolor={"red"}
        height={"50px"}
        width={"50px"}
      >
        {nodeRes.title}
      </Box>
      <Box height={"20px"}>
        {
          nodeRes.downNodeId == undefined && <Button onClick={() => {
            nodeUpdater.append(nodeEntity, undefined, undefined, "", "down")
          }}>+ </Button>
        }
      </Box>
    </Box>
    <Box width={"20px"}>
      {
        nodeRes.rightNodeId == undefined && <Button onClick={() => {
          nodeUpdater.append(nodeEntity, undefined, undefined, "", "right")
        }}>+</Button>
      }
    </Box>
  </Box>

}

export interface NodeCardProps extends OverrideProps<BoxTypeMap, any> {
  nodeEntity: NodeEntity | undefined
  nodeUpdater: NodesUpdater
}
