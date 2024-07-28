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
import {useRoadmapState} from "~/routes/roadmap/RoadmapState";

export async function loader(
  {params}: LoaderFunctionArgs
): Promise<Response> {
  const roadmapId = params.roadmapId;
  if (roadmapId == undefined)
    return json(Results.createErrorResult(ErrorIds.NoId, "no roadmap id"))
  return json([
    await RoadmapClient.get(roadmapId)
  ])
}

export default function RoadmapNew(
  {
    ...props
  }: NewProps,
) {
  const [roadmapResult]: [ApiResult<RoadmapRes>, ApiResult<NodeRes[]>]
    = useLoaderData<typeof loader>()
  return (
    <Box
      {...props}
      className={"bg-white"}
    >
      <RoadmapToolbar roadmapResult={roadmapResult}/>
      <SuccessOrErrMsg result={roadmapResult} success={roadmap => {
        const roadmapState = useRoadmapState(roadmap.value)
        return <RoadmapEditor roadmapState={roadmapState}/>
      }
      }/>
    </Box>
  )
}

export interface NewProps {
}
