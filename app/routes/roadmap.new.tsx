import {Box} from "@mui/system";
import {RoadmapNewForm, RoadmapNewFormNs} from "~/routes/_form/roadmapNewForm";
import {Request} from "@remix-run/web-fetch";

export async function action({request}: { request: Request }) {
  return await RoadmapNewFormNs.action(request)
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
      <RoadmapNewForm <typeof action>/>
    </Box>
  )
}

export interface NewProps {
}
