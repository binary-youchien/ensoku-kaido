import {useMemo, useState} from "react";
import {Nodes} from "~/routes/node/Nodes";
import {NodesUpdater} from "~/routes/node/NodesUpdater";

export interface NodesState {
  nodes: Nodes
  updater: NodesUpdater
}

export function useNodesState(roadmapId: string): NodesState {
  const [nodes, setNodes] = useState(new Nodes([]))


  return useMemo(() => {
    return {
      nodes: nodes,
      updater: new NodesUpdater(setNodes, roadmapId)
    }
  }, [nodes]);
}