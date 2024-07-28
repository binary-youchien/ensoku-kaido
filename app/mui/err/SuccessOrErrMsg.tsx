import {ApiResult, SuccessResult} from "~/client/result";
import {ReactNode} from "react";
import {ErrorMessage} from "~/mui/err/ErrorMessage";

export function SuccessOrErrMsg<T>(
  {
    result,
    success,
  }: SuccessOrErrorProps<T>,
) {

  return (
    result.error ? <ErrorMessage error={result.error.message}/> : success(result)
  )
}

export interface SuccessOrErrorProps<T> {
  result: ApiResult<T>
  success: (result: SuccessResult<T>) => ReactNode
}
