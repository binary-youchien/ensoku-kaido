import {Box} from "@mui/system";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "react-router";
import {ApiResult, Results} from "~/client/result";
import {ErrorIds} from "~/client/error";
import {RoadmapClient, RoadmapRes} from "~/client/roadmapClient";
import {useLoaderData} from "@remix-run/react";
import {RoadmapEditor} from "~/routes/roadmap/RoadmapEditor";
import {RoadmapToolbar} from "~/routes/roadmap/RoadmapToolbar";

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
  const [roadmapResult]: [ApiResult<RoadmapRes>] = useLoaderData<typeof loader>()

  return (
    <Box
      {...props}
      className={"bg-white"}
    >
      <RoadmapToolbar roadmapResult={roadmapResult}/>
      <RoadmapEditor roadmapResult={roadmapResult}/>
    </Box>
  )
}

export interface NewProps {
}
