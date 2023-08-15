import { useState } from "react";
import { Image, Text, Flex, VStack, Spinner } from "@chakra-ui/react";
import { useShopList } from "../../hooks/shopHooks";
import { useOutletContext } from "react-router-dom";

export const ShopList = () => {
  const query = useOutletContext();
  const { category, setCategory, coords, setcoords, reach, setreach } = query;
  const { isLoading, isError, data, error, isSuccess } = useShopList(
    category,
    coords,
    reach
  );
  const shopsFiltered = data?.commerces;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return `el error es: ${error}`;
  }

  if (isSuccess) {
    return (
      <Flex direction="column" w="full">
        <Flex wrap="wrap">
          {shopsFiltered?.map((negocio) => (
            <Flex
              key={negocio._id}
              justify="flex-start"
              w="400px"
              bg="orange.100"
              border="1px solid tomato.200"
              padding={5}
              m="0.5"
            >
              <Flex w="400px">
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="lg"
                  src={negocio.imgName}
                  alt={negocio.nombre}
                />

                <VStack w="300px">
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
