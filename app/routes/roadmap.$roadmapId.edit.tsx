import {Box} from "@mui/system";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "react-router";
import {ApiResult, Results} from "~/client/result";
import {ErrorIds} from "~/client/error";
import {RoadmapClient, RoadmapRes} from "~/client/roadmapClient";
import {useLoaderData} from "@remix-run/react";
import {RoadmapEditor} from "~/routes/roadmap/editor/RoadmapEditor";
import {RoadmapToolbar} from "~/routes/roadmap/RoadmapToolbar";
import {NodeClient, NodeRes} from "~/client/nodeClient";
import {SuccessOrErrMsg} from "~/mui/err/SuccessOrErrMsg";

export async function loader(
  {params}: LoaderFunctionArgs
): Promise<Response> {
  const roadmapId = params.roadmapId;
  if (roadmapId == undefined)
    return json(Results.createErrorResult(ErrorIds.NoId, "no roadmap id"))
  return json([
    await RoadmapClient.get(roadmapId),
    await NodeClient.get(roadmapId)
  ])
}

export default function RoadmapNew(
  {
    ...props
  }: NewProps,
) {
  const [roadmapResult, nodesResult]: [ApiResult<RoadmapRes>, ApiResult<NodeRes[]>]
    = useLoaderData<typeof loader>()

  return (
    <Box
      {...props}
      className={"bg-white"}
    >
      <RoadmapToolbar roadmapResult={roadmapResult}/>
      <SuccessOrErrMsg result={roadmapResult} success={roadmap =>
        <SuccessOrErrMsg result={nodesResult} success={nodes =>
          <RoadmapEditor nodesRes={nodes.value} roadmapRes={roadmap.value}/>
        }/>
      }/>
    </Box>
  )
}

export interface NewProps {
}
