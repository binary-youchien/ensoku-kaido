import {Box} from "@mui/system";
import {LoaderFunctionArgs} from "@remix-run/router";
import {NotFound} from "~/routes/_unit/NotFound";

export async function loader(
  {params}: LoaderFunctionArgs
) {
  const roadmapId = params.roadmapId;
}

export default function RoadmapNew(
  {
    ...props
  }: NewProps,
) {
  return (
    <Box
      {...props}
      className={"bg-white"}
    >
      <NotFound/>
    </Box>
  )
}

export interface NewProps {
}
