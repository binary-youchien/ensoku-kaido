import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {RoadmapState} from "~/routes/roadmap/RoadmapState";

export function RoadmapEditor(
  {
    roadmapState,
    ...props
  }: RoadmapEditorProps,
) {

  return (
    <Box
      displayPrint={"flex"}
      {...props}
    >
    </Box>
  )
}

export interface RoadmapEditorProps extends OverrideProps<BoxTypeMap, any> {
  roadmapState: RoadmapState
}
