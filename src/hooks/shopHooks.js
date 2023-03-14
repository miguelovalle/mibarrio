import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const useShopList = ({ lg, lt }) => {
  const shoplist = async () => {
    const resp = await fetchSinToken(
      `commerce/list?lg=${Number(lg)}&lt=${Number(lt)}`
    );
    const data = await resp.json();
    return data;
  };
  return useQuery(['shops'], shoplist);
};

export const useProducts = id => {
  const listProducts = async () => {
    const resp = await fetchSinToken('product/sintkn', { id }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery(['listproducts'], listProducts);
};

export const useMutateAddProduct = (id = null) => {
  const queryClient = useQueryClient();

  const addProduct = async product => {
    let resp;
    if (id) {
      resp = await fetchConToken(`product/products/${id}`, product, 'PUT');
    } else {
      resp = await fetchConToken('product/new', product, 'POST');
    }
    const data = await resp.json();
    return data;
  };
  return useMutation(addProduct, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['listproducts']);
    },
  });
};

export const useMutateDelectProduct = () => {
  const queryClient = useQueryClient();
  const deleteProduct = async id => {
    const resp = await fetchConToken(`product/delete/${id}`, {}, 'DELETE');
    const data = await resp.json();
    return data;
  };
  return useMutation(deleteProduct, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['listproducts']);
    },
  });
};

export const useMutateProductEdit = () => {
  const editProduct = async id => {
    const resp = await fetchConToken(`product/products/${id}`, 'GET');
    const data = resp.json();
    return data;
  };
  return useMutation(editProduct);
};

export const useMutateUpdateProduct = id => {
  const updateProduct = async product => {
    const resp = await fetchConToken(`product/products/${id}`, product, 'PUT');
    const data = await resp.json();
    return data;
  };
  return useMutation(updateProduct);
};

export const useMutateEnabledAll = () => {
  const queryClient = useQueryClient();
  const updateEnabled = async ({ id, enabl }) => {
    const resp = await fetchConToken('product/enabled', { id, enabl }, 'POST');
    const data = await resp.json();
    return data;
  };
  return useMutation(updateEnabled, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['listproducts']);
      // return necesario para que espere a que termine invalidate y luego renderizar la lista en el onsuccess de mutate fn.
    },
  });
};

export const useProduct = id => {
  const product = async () => {
    const resp = await fetchConToken(`product/products/${id}`, 'GET');
    const data = await resp.json();
    return data;
  };

  return useQuery(['listproducts/id'], product);
};
