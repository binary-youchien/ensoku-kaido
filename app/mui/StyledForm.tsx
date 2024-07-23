import * as React from "react";
import {createContext, ReactNode} from "react";
import {Form, useActionData} from "@remix-run/react";
import {Request} from "@remix-run/web-fetch";
import {json} from "react-router";
import {ErrorMessage} from "~/mui/ErrorMessage";


export namespace FormState {
  export const Context = createContext<FormError | undefined>(undefined)

  export function error(error: FormError) {
    return json(error)
  }
}

export type FormError = { [key: string]: string }

export function StyledForm<T extends (({request}: { request: Request }) => Promise<Response>)>(
  {
    ...props
  }: FormProps,
) {
  const formState: FormError | undefined = useActionData<T>();

  return (
    <FormState.Context.Provider
      value={formState}
    >
      <ErrorMessage error={formState && formState["form"]}/>
      <Form method={"POST"} {...props}/>
      <ErrorMessage error={formState && formState["form"]}/>
    </FormState.Context.Provider>
  )
}

export interface FormProps {
  children?: ReactNode
}
