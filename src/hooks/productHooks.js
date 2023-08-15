import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch";

export const useProducts = (id) => {
  const listProducts = async () => {
    const resp = await fetchSinToken("product/sintkn", { id }, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["listproducts"],
    queryFn: listProducts,
  });
};

export const useSearch = (searchState) => {
  const search = async () => {
    const resp = await fetchSinToken("product/search", searchState, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["search", searchState],
    queryFn: search,
  });
};

/* export const useSearch = (searchState, hasQuery) => {
  const search = async () => {
    const resp = await fetchSinToken("product/search", searchState, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["search", searchState, hasQuery],
    queryFn: search,
    enabled: hasQuery,
  });
}; */

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

export const useMutateDelectProduct = () => {
  const queryClient = useQueryClient();
  const deleteProduct = async (id) => {
    const resp = await fetchConToken(`product/delete/${id}`, {}, "DELETE");
    const data = await resp.json();
    return data;
  };
  return useMutation(deleteProduct, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["listproducts"]);
    },
  });
};

export const useMutateProductEdit = () => {
  const editProduct = async (id) => {
    const resp = await fetchConToken(`product/${id}`, "GET");
    const data = resp.json();
    return data;
  };
  return useMutation(editProduct);
};

export const useMutateUpdateProduct = () => {
  const updateProduct = async (product) => {
    const resp = await fetchConToken("product", product, "PUT");
    const data = await resp.json();
    return data;
  };
  return useMutation(updateProduct);
};

export const useMutateReplaceProduct = (productId) => {
  const replaceProduct = async (product) => {
    const resp = await fetchConToken(
      `product/replace/${productId}`,
      product,
      "PUT"
    );
    const data = await resp.json();
    return data;
  };
  return useMutation(replaceProduct);
};

export const useMutateEnabledAll = () => {
  const queryClient = useQueryClient();
  const updateEnabled = async ({ id, enabl }) => {
    const resp = await fetchConToken("product/enabled", { id, enabl }, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(updateEnabled, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["listproducts"]);
      // return necesario para que espere a que termine invalidate y luego renderizar la lista en el onsuccess de mutate fn.
    },
  });
};

export const useProduct = (id) => {
  const product = async () => {
    const resp = await fetchSinToken(`product/${id}`, "GET");
    const data = await resp.json();
    return data;
  };

  return useQuery(["listproducts/id"], product);
};
