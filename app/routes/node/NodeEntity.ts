import {NodeRes} from "~/client/nodeClient";
import {ErrorData} from "~/client/result";

export class NodeEntity {
  constructor(
    readonly data: NodeData,
    readonly column: number,
    readonly row: number
  ) {
  }
}

export type NodeData = SuccessNodeData | ErrorNodeData

export interface SuccessNodeData {
  nodeRes: NodeRes
  error?: undefined
}

export interface ErrorNodeData {
  nodeRes?: undefined
  error: ErrorData
}
