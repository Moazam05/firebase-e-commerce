import { fetchWrapper } from './request';

export const httpService = async (method, url, data, params) => {
  const res = await fetchWrapper(method, `${url}`, data, params);
  return res;
};
