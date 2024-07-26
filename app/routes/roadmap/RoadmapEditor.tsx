import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ApiResult} from "~/client/result";
import {RoadmapRes} from "~/client/roadmapClient";

export function RoadmapEditor(
  {
    ...props
  }: RoadmapEditorProps,
) {


  return (
    <Box
      {...props}
    >
    </Box>
  )
}

export interface RoadmapEditorProps extends OverrideProps<BoxTypeMap, any> {
  roadmapResult: ApiResult<RoadmapRes>
}
