import {NodeEntity} from "~/routes/node/NodeEntity";
import {Nodes} from "~/routes/node/Nodes";

export class NodeColumn {
  constructor(
    readonly nodeEntities: (NodeEntity | undefined)[]
  ) {
  }
}