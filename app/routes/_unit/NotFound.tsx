import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";

export function NotFound(
  {
    ...props
  }: NotFoundProps,
) {


  return (
    <Box
      {...props}
    >
      <Typography variant={"h2"} fontSize={"xxx-large"}>404 Not Found</Typography>
    </Box>
  )
}

export interface NotFoundProps extends OverrideProps<BoxTypeMap, any> {
}
