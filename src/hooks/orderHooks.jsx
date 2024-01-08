import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useMutateAddOrder = () => {
  const addOrder = async (order) => {
    const resp = await fetchSinToken("order", order, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(addOrder);
};

export const useMutateRateService = () => {
  const rateService = async (objService) => {
    const resp = await fetchSinToken("order/rateservice", objService, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(rateService);
};

export const useMutateRateApp = () => {
  const rateApp = async (objApp) => {
    const resp = await fetchSinToken("order/rateapp", objApp, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(rateApp);
};

export const useGetOrder = (orderId, activeIndex) => {
  const getOrder = async () => {
    const resp = await fetchSinToken("order/" + orderId, "GET");
    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["order", activeIndex],
    queryFn: getOrder,
  });
};

export const useShop = (id) => {
  const shop = async () => {
    const resp = await fetchSInToken(`commerce/${id}`, "GET");
    const data = await resp.json();
    return data;
  };
  return useQuery(["shop", id], shop);
};
