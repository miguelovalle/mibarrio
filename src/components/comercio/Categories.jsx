import { HStack, Spinner, VStack, Text, Image, Box } from "@chakra-ui/react";
import React from "react";
import { useGetCategories } from "../../hooks/shopHooks";

export const Categories = ({ setCategory }) => {
  const { isLoading, isError, data, error } = useGetCategories();
  if (isError) {
    return console.log("error", error);
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <HStack>
      {data.ok === true
        ? data?.types?.map((item, index) => {
            return (
              <VStack key={index}>
                <Box as="button" onClick={() => setCategory(item?.name)}>
                  <Image
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="lg"
                    src={item.img}
                  />
                  <Text>{item.name}</Text>
                </Box>
              </VStack>
            );
          })
        : null}
    </HStack>
  );
};
