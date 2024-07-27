import {RoadmapUpdater} from "~/routes/roadmap/RoadmapUpdater";
import {useMemo, useState} from "react";
import {Nodes} from "~/routes/node/Nodes";

export interface NodesState {
  nodes: Nodes
  updater: RoadmapUpdater
}

export function useNodesState(): NodesState {
  const [nodes, setNodes] = useState(new Nodes([]))

  return useMemo(() => {
    return {
      nodes: nodes,
      updater: null
    }
  }, [nodes]);
}