import { API } from "./api";
import { getData } from "../helpers";
import {
  GetMemberAwardsParams,
  GetMemberChartDataParams,
  GetMemberDataParams,
  GetMemberProfileParams,
  MemberInfo,
  MemberParticipationCredit,
} from "../types";

export class MemberAPI extends API {
  /**
   *
   * @param {GetMemberAwardsParams} [params]
   * @param {number} params.customerId - Defaults to the authenticated member.
   *
   * @returns
   */
  getMemberAwards = async (params?: GetMemberAwardsParams) =>
    getData(this.fetchCookie, "data/member/awards", {
      cust_id: params?.customerId,
    });
  /**
   *
   * @param {GetMemberChartDataParams} params
   * @param {number} [params.customerId] - Defaults to the authenticated member.
   * @param {number} params.categoryId - 1 - Oval; 2 - Road; 3 - Dirt oval; 4 - Dirt road.
   * @param {string} params.chartType - 1 - iRating; 2 - TT Rating; 3 - License/SR.
   *
   * @returns
   */
  getMemberChartData = async (params: GetMemberChartDataParams) =>
    getData(this.fetchCookie, "data/member/chart_data", {
      cust_id: params.customerId,
      category_id: params.categoryId,
      chart_type: params.chartType,
    });
  /**
   *
   * @param {GetMemberDataParams} params
   * @param {number[]} params.customerIds - Array of customer IDs.
   * @param {boolean} [params.includeLicenses]
   *
   * @returns
   */
  getMemberData = async (params: GetMemberDataParams) =>
    await getData(this.fetchCookie, "data/member/get", {
      cust_ids: params.customerIds,
      include_licenses: params.includeLicenses,
    });
  /**
   *
   * @returns
   */
  getMemberInfo = async () =>
    await getData<MemberInfo>(this.fetchCookie, "data/member/info");
  /**
   *
   * @returns
   */
  getMemberParticipationCredits = async () =>
    await getData<MemberParticipationCredit[]>(
      this.fetchCookie,
      "data/member/participation_credits"
    );
  /**
   *
   * @param {GetMemberProfileParams} params
   * @param {number} [params.customerId] - Defaults to the authenticated member.
   *
   * @returns
   */
  getMemberProfile = async (params?: GetMemberProfileParams) =>
    await getData(this.fetchCookie, "data/member/profile", {
      cust_id: params?.customerId,
    });
}
