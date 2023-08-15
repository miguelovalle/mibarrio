import { useQuery } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useShopList = (position) => {
  const lng = position.lng;
  const lat = position.lat;
  const shoplist = async () => {
    const resp = await fetchSinToken(
      `commerce/list?lg=${Number(lng)}&lt=${Number(lat)}`
    );
    const data = await resp.json();
    return data;
    use;
  };
  return useQuery(["shops", position], shoplist);
};

export const useProducts = (id) => {
  const listProducts = async () => {
    const resp = await fetchSinToken("product/sintkn", { id }, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["listproducts"], queryFn: listProducts });
};

export const useSearch = (q) => {
  const search = async () => {
    const resp = await fetchSinToken("product/search", { q }, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["search"], queryFn: search });
};

export const useGetCategories = () => {
  const typefn = async () => {
    const resp = await fetchSinToken("commerce/cat/types");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["types"], queryFn: typefn });
};
