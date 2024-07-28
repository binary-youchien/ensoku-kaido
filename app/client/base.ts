import {ErrorIds} from "~/client/error";
import {ApiResult, Results} from "~/client/result";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class FetchBuilder {
  constructor(
    readonly path: string,
    readonly init: RequestInit = {}
  ) {
  }

  body(body: any): FetchBuilder {
    return new FetchBuilder(this.path, {
      body: JSON.stringify(body), ...this.init
    });
  }

  method(method: HTTPMethod): FetchBuilder {
    return new FetchBuilder(this.path, {
      method: method.toString(), ...this.init
    });
  }

  async fetch<R>() {
    return base.fetchApi<R>(this.path, this.init)
  }
}


export namespace base {
  const baseUrl = import.meta.env.VITE_BASE_URL

  export async function fetchApi<R>(path: string, init: RequestInit): Promise<ApiResult<R>> {
    try {
      return await fetch(createApiURL(path), mergeDefaultRequestInit(init)).then(async (res) => {
        console.debug(path, init)
        return await resToResult<R>(res)
      }).catch((fetchReason) => {
        console.debug("fetch error: ", fetchReason)
        return Results.createErrorResult(ErrorIds.UnknownError, fetchReason)
      });
    } catch (err) {
      console.debug("url error: ", err, path, baseUrl)
      return Results.createErrorResult(ErrorIds.UnknownError, err)
    }
  }

  function mergeDefaultRequestInit(init: RequestInit): RequestInit {
    return {
      headers: mergeDefaultHeadersInit(init.headers),
      mode: init.mode || "cors",
      ...init
    }
  }

  function mergeDefaultHeadersInit(init: HeadersInit | undefined): HeadersInit {
    return {
      'Content-Type': getFromHeadersInit(init, 'Content-Type', 'application/json'),
      ...init
    }
  }

  function getFromHeadersInit(init: HeadersInit | undefined, key: string, defaultValue: string) {
    if (init == undefined) return defaultValue
    if (init instanceof Headers) return init.get(key) || defaultValue
    if (!Array.isArray(init)) return init[key] || defaultValue

    const result = init.find(value => value[0] === key)
    if (result == undefined) return defaultValue
    return result[1]
  }

  async function resToResult<R>(res: Response): Promise<ApiResult<R>> {
    const jsonResult = await jsonToResult<R>(res.json(), res)
    if (res.ok) {
      return jsonResult
    }
    if (jsonResult.value != undefined) {
      return {error: ErrorIds.UnknownError.createData(jsonResult.value.toString())}
    }
    return jsonResult
  }

  async function jsonToResult<R>(json: Promise<R>, res: Response): Promise<ApiResult<R>> {
    return await json.then(value => {
      return {value: value as R}
    }).catch(reason => {
      console.debug("json error: ", reason, res)
      return Results.createErrorResult(ErrorIds.InvalidBody, reason)
    })
  }

  export function createApiURL(url: URL | string): URL {
    try {
      return new URL(url, baseUrl);
    } catch (e) {
      console.error(e, url, baseUrl);
      throw e
    }
  }

}