import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ApiResult} from "~/client/result";
import {RoadmapRes} from "~/client/roadmapClient";
import {Typography} from "@mui/material";
import {SuccessOrErrMsg} from "~/mui/err/SuccessOrErrMsg";
import {Link} from "@remix-run/react";

export function RoadmapToolbar(
  {
    roadmapResult,
    ...props
  }: RoadmapToolbarProps,
) {

  return (
    <Box
      {...props}
      display={"flex"}
    >
      <SuccessOrErrMsg result={roadmapResult} success={result => <>
        <Typography variant={"h2"}>{result.value.title}</Typography>
        <Link to={`/roadmap/${result.value.id}`}>編集完了</Link>
      </>
      }/>
    </Box>
  )
}

export interface RoadmapToolbarProps extends OverrideProps<BoxTypeMap, any> {
  roadmapResult: ApiResult<RoadmapRes>
}
