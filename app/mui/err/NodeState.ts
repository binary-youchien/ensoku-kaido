import {NodeRes} from "~/client/nodeClient";

export class NodeState {
  constructor(
    readonly nodes: (NodeRes | undefined)[][],
    readonly setNodeState: (nodeState: NodeState) => void
  ) {
  }
}
