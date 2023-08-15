import { useMutation } from "@tanstack/react-query";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch";

export const useMutateAddOrder = () => {
  const addOrder = async (order) => {
    const resp = await fetchSinToken("order", order, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(addOrder);
};

export const useMutateAddProduct = (id = null) => {
  const queryClient = useQueryClient();
  const addProduct = async (product) => {
    const resp = await fetchConToken("product/new", product, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(addProduct, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["listproducts"]);
    },
  });
};
