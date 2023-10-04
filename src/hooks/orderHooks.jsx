import { useMutation } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useMutateAddOrder = () => {
  const addOrder = async (order) => {
    const resp = await fetchSinToken("order", order, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(addOrder);
};
