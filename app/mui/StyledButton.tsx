import {OverrideProps} from "@mui/types";
import {Button} from "@mui/material";
import {ExtendButtonBaseTypeMap} from "@mui/material/ButtonBase/ButtonBase";
import {MouseEventHandler} from "react";

export function StyledButton(
  {
    onClick,
    ...props
  }: StyledButtonProps,
) {


  return (
    <Button
      color={"primary"}
      {...props}
      variant={"contained"}
      onClick={onClick}
    />
  )
}

export interface StyledButtonProps extends OverrideProps<ExtendButtonBaseTypeMap<any>, any> {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
