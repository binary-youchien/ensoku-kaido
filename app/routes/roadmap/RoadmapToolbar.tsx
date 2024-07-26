import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ApiResult} from "~/client/result";
import {RoadmapRes} from "~/client/roadmapClient";
import {Typography} from "@mui/material";

export function RoadmapToolbar(
  {
    roadmapResult,
    ...props
  }: RoadmapToolbarProps,
) {

  return (
    <Box
      {...props}
    >
      <Typography variant={"h2"}>{roadmapResult.value?.title || "404 Not Found"}</Typography>
    </Box>
  )
}

export interface RoadmapToolbarProps extends OverrideProps<BoxTypeMap, any> {
  roadmapResult: ApiResult<RoadmapRes>
}
