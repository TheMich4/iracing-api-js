import { API } from "./api";
import { getData } from "../helpers";
import type {
  GetHostedCombinedSessionsParams,
  HostedCombinedSessions,
  HostedSessions,
} from "../types/hosted";

export class HostedAPI extends API {
  /**
   *
   * **Get list of hosted combined sessions.**
   *
   * *Sessions that can be joined as a driver or spectator, and also includes non-league pending sessions for the user.*
   *
   * @param {GetHostedCombinedSessionsParams} [params]
   * @param {number} [params.packageId] - If set, return only sessions using this car or track package ID.
   *
   * @returns
   */
  getHostedCombinedSessions = async (
    params?: GetHostedCombinedSessionsParams
  ) => {
    return (
      await getData<HostedCombinedSessions>(
        this.fetchCookie,
        "data/hosted/combined_sessions",
        {
          package_id: params?.packageId,
        }
      )
    )?.data;
  };
  /**
   *
   * **Get list of hosted sessions.**
   *
   * *Sessions that can be joined as a driver. Without spectator and non-league pending sessions for the user.*
   *
   * @returns
   */
  getHostedSessions = async () => {
    return (
      await getData<HostedSessions>(this.fetchCookie, "data/hosted/sessions")
    )?.data;
  };
}
