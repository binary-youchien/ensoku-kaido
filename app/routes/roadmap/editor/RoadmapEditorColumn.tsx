import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";

export function RoadmapEditorColumn(
  {
    ...props
  }: RoadmapEditorColumnProps,
) {


  return (
    <Box
      {...props}
    >
    </Box>
  )
}

export interface RoadmapEditorColumnProps extends OverrideProps<BoxTypeMap, any> {
}
