import { useState } from "react";
import { Image, Text, Flex, VStack, Spinner } from "@chakra-ui/react";
import { useShopList } from "../../hooks/shopHooks";
import { useOutletContext } from "react-router-dom";
import { Categories } from "../comercio/Categories";
import { ProgressOrder } from "../product/render/ProgressOrder";

export const ShopList = () => {
  const query = useOutletContext();
  const [category, setCategory] = useState("Restaurantes");
  const { coords, setcoords, reach, setreach } = query;
  const { isLoading, isError, data, error, isSuccess } = useShopList(
    category,
    coords,
    reach
  );
  const shopsFiltered = data?.commerces;
  const orderId = localStorage.getItem("orderId");
  const dateOrderstr = localStorage.getItem("dateOrder");
  const dateOrder = new Date(dateOrderstr).setHours(0, 0, 0, 0);
  const todaydate = new Date().setHours(0, 0, 0, 0);
console.log(dateOrder)
console.log(todaydate)
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return `el error es: ${error}`;
  }

  if (isSuccess) {
    return (
      <Flex direction="column" w="full">
        <Categories setCategory={setCategory} />
        {dateOrder && dateOrder === todaydate ? (
          <ProgressOrder orderId={orderId} />
        ) : null}
        <Flex wrap="wrap">
          {shopsFiltered?.map((negocio) => (
            <Flex
              key={negocio._id}
              justify="flex-start"
              minW={450}
              bg="gray.100"
              border="1px solid tomato.200"
              padding={5}
              m="0.5"
            >
              <Flex w="450px">
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="lg"
                  src={negocio.imgName}
                  alt={negocio.nombre}
                />

                <VStack w="350px">
                  <a href={`shops/${negocio._id}`}>
                    {negocio.name}
                    <Text fontSize="small">{negocio.specialty}</Text>
                    <Text fontSize="small">{negocio.cross}</Text>
                  </a>
                </VStack>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  }
};
