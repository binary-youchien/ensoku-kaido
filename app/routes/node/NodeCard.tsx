import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {NodeEntity} from "~/routes/node/NodeEntity";
import {TextInput} from "~/routes/_unit/_form/TextInput";
import {ErrorMessage} from "~/mui/err/ErrorMessage";
import {Nodes} from "~/routes/node/Nodes";
import {taskOrderQueueMap} from "~/entry.client";
import {NodeClient} from "~/client/nodeClient";

export function NodeCard(
  {
    nodeEntity,
    nodeUpdater,
    setNodes,
    ...props
  }: NodeCardProps,
) {
  const res = nodeEntity.data.nodeRes
  return (
    <Box
      {...props}
      padding={"10px"}
    >
      <ErrorMessage error={nodeEntity.data.error?.message}/>
      {
        res && <>
          <TextInput size={"small"} label={"タイトル"} value={res.title} onChange={(event) => {
            const title = event.target.value
            setNodes(prev => {
              prev.nodes[nodeEntity.column].nodeEntities[nodeEntity.row]!.data.nodeRes!!.title = title
              return prev.copy()
            })
            taskOrderQueueMap.dispatch(res.id, async () => {
              await NodeClient.put(res.roadmapId, res.id, {
                condition: res?.condition,
                description: res?.description,
                downNodeId: res?.downNodeId,
                rightNodeId: res?.rightNodeId,
                title: title
              })
            })
          }}/>

          <TextInput size={"small"} label={"説明"} value={res.description} onChange={(event) => {
            const desc = event.target.value
            setNodes(prev => {
              prev.nodes[nodeEntity.column].nodeEntities[nodeEntity.row]!.data.nodeRes!!.description = desc
              return prev.copy()
            })
            taskOrderQueueMap.dispatch(res.id, async () => {
              await NodeClient.put(res.roadmapId, res.id, {
                condition: res?.condition,
                description: desc,
                downNodeId: res?.downNodeId,
                rightNodeId: res?.rightNodeId,
                title: res.title
              })
            })
          }}/>
        </>
      }
    </Box>
  )
}

export interface NodeCardProps extends OverrideProps<BoxTypeMap, any> {
  nodeEntity: NodeEntity
  setNodes: (nodeState: (prev: Nodes) => Nodes) => void
}
