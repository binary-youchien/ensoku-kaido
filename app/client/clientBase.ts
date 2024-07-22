import {ErrorId, ErrorIds} from "~/client/error";

namespace clientBase {
  const baseUrl = import.meta.env.BASE_URL

  export async function fetchApi<R>(path: string): Promise<ApiResult<R>> {
    return await fetch(createApiURL(path)).then(async (res) => {
      if (res.ok) {
        return await createJsonResult<R>(res)
      }
      return await createJsonResult<R>(res).then(result => {
        if (result.value != undefined) {
          return {error: ErrorIds.UnknownError.createData(result.value.toString())}
        } else {
          return result
        }
      })
    }).catch((fetchReason) => {
      return createErrorResult(ErrorIds.UnknownError, fetchReason)
    });
  }

  async function createJsonResult<R>(res: Response): Promise<ApiResult<R>> {
    return await res.json().then(value => {
      return {value: value as R}
    }).catch(reason => {
      return createErrorResult(ErrorIds.InvalidBody, reason)
    })
  }

  function createErrorResult(errorId: ErrorId, reason: any): ErrorResult {
    if (reason instanceof Error && reason.message) {
      return {error: errorId.createData(reason.message)};
    }
    return {error: errorId.createData(reason.toString())};
  }

  type ApiResult<T> = SuccessResult<T> | ErrorResult

  export interface SuccessResult<T> {
    value: T;
    error?: undefined;
  }

  export interface ErrorResult {
    value?: undefined;
    error: ErrorData;
  }

  export interface ErrorData {
    error_id: string;
    message: string;
  }

  export function createApiURL(url: URL | string): URL {
    try {
      return new URL(url, baseUrl);
    } catch (e) {
      console.error(e);
      throw e
    }
  }
}