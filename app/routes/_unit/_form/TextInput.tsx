import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {useContext} from "react";
import {FormState} from "~/mui/StyledForm";
import {ErrorMessage} from "~/mui/err/ErrorMessage";

export function TextInput(
  {
    color,
    margin,
    name,
    ...props
  }: TextInputProps & TextFieldProps,
) {
  const formState = useContext(FormState.Context)
  return (
    <>
      <ErrorMessage error={name && formState && formState[name]}/>
      <TextField
        {...props}
        color={color || "secondary"}
        sx={{
          width: "100%",
          margin: margin || "10px 0",
        }}
        name={name}
      />
    </>
  );
}

export interface TextInputProps {
}
