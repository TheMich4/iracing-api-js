import { API_URL } from "../consts";
import { RateLimit, type FetchCookie, type Options } from "../types";

import humps from "humps";
const { camelizeKeys } = humps;

export class API {
  fetchCookie: FetchCookie;
  options: Options;

  constructor(fetchCookie: FetchCookie, options: Options) {
    this.fetchCookie = fetchCookie;
    this.options = options;
  }

  _getData = async <Data = Record<string, unknown>, Parameters = void>(
    endpoint: string,
    params?: Parameters | Record<string, unknown>
  ): Promise<Data | undefined> => {
    const url = this._getUrl(endpoint, params);
    const response = await this.fetchCookie(url, {
      cache: "no-cache",
      credentials: "include",
    });
    const data = await response.json();

    if (data?.link) {
      const linkData = await this._getLinkData<Data>(data?.link);

      return linkData;
    }

    return data as Data | undefined;
  };

  _getLinkData = async <Data>(
    link: string | undefined
  ): Promise<Data | undefined> => {
    if (!link) return undefined;

    const response = await fetch(link);
    const data = await response.json();

    if (!data) return undefined;

    return camelizeKeys(data) as Data;
  };

  _getUrl = <Parameters = Record<string, unknown>>(
    endpoint: string,
    params?: Parameters
  ) => {
    // Filter out empty values
    const searchParams =
      params &&
      new URLSearchParams(JSON.parse(JSON.stringify(params))).toString();

    return `${API_URL}${endpoint}${searchParams ? `?${searchParams}` : ""}`;
  };

  _getRateLimit = (response: Response): RateLimit => {
    const limit = +response.headers.get("x-ratelimit-limit")! ?? 0;
    const remaining = +response.headers.get("x-ratelimit-remaining")! ?? 0;
    const reset = +response.headers.get("x-ratelimit-reset")! ?? 0;

    return { limit, remaining, reset };
  };
}
