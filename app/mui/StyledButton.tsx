import {OverrideProps} from "@mui/types";
import {Button} from "@mui/material";
import {ExtendButtonBaseTypeMap} from "@mui/material/ButtonBase/ButtonBase";

export function StyledButton(
  {
    ...props
  }: StyledButtonProps,
) {


  return (
    <Button
      color={"primary"}
      {...props}
      variant={"contained"}
    />
  )
}

export interface StyledButtonProps extends OverrideProps<ExtendButtonBaseTypeMap<any>, any> {
  type?: "button" | "submit" | "reset" | undefined;
}
