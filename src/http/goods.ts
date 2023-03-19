import axios from "./axios";
import qs from "qs";

export function getShopList(params: Record<string, any>) {
  return axios.post("/market/rest/tianma/getGoodsList", qs.stringify(params));
}

export function getGoodsList(params = { pageNum: 1 }) {
  return axios.post(
    `/market/rest/weimeng/getGoodsList?${qs.stringify(params)}`,
    params
  );
}

export function getGoodsDetailInfo(params = { dataSource: "HJ", goodsId: 0 }) {
  return axios.post(
    `/market/rest/weimeng/getGoodsDetailInfo?${qs.stringify(params)}`,
    params
  );
}

export function save(params: Record<string, any>) {
  return axios.post(`/market/rest/GoodsMapping/save`, params);
}

export function getLinkList(params = { page: 1 }) {
  return axios.post(
    `/market/rest/GoodsMapping/list?${qs.stringify(params)}`,
    params
  );
}

export function subscribeOrCancel(flag: boolean, list: string[]) {
  return axios.post(
    `/market/rest/youstong/subscribeOrCancel?${qs.stringify({ flag })}`,
    list
  );
}

export function deleteLinkId(id: string) {
  return axios.get(`/market/rest/GoodsMapping/delete?${qs.stringify({ id })}`);
}
