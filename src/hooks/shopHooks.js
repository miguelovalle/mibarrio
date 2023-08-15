import { useQuery } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useShopList = (category, coords, reach) => {
  const shoplist = async () => {
    const resp = await fetchSinToken(
      "commerce/list",
      { category, coords, reach },
      "POST"
    );
    const data = await resp.json();

    return data;
    use;
  };
  return useQuery(["shops", category, coords, reach], shoplist);
};

export const useGetCategories = () => {
  const typefn = async () => {
    const resp = await fetchSinToken("commerce/cat/types");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["types"], queryFn: typefn });
};
