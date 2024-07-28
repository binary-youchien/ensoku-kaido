import {Box} from "@mui/system";
import {RoadmapNewForm, RoadmapNewFormNs} from "~/routes/_form/roadmapNewForm";
import {Request} from "@remix-run/web-fetch";
import {useActionData} from "@remix-run/react";
import {FormError} from "~/mui/StyledForm";

export async function action({request}: { request: Request }) {
  console.debug("on action")
  return await RoadmapNewFormNs.action(request)
}

export default function RoadmapNew(
  {
    ...props
  }: NewProps,
) {
  const formError: FormError | undefined = useActionData<typeof action>();
  return (
    <Box
      {...props}
      className={"bg-white"}
    >
      <RoadmapNewForm formError={formError}/>
    </Box>
  )
}

export interface NewProps {
}
