import {
  HStack,
  Spinner,
  VStack,
  Text,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useGetCategories } from "../../hooks/shopHooks";
import { useNavigate } from "react-router-dom";

export const Categories = ({ setCategory }) => {
  const { isLoading, isError, data, error } = useGetCategories();

  const navigate = useNavigate();

  if (isError) {
    return console.log("error", error);
  }
  if (isLoading) {
    return <Spinner />;
  }

/*   const handleShopList = (name) => {
    console.log(name);
    setCategory(name);
    navigate("/shopList");
  }; */
  return (
    <Flex wrap="nowrap" justifyContent={"flex-start"} gap={4}>
      {data.ok === true
        ? data?.types?.map((item, index) => {
            return (
              <VStack key={index}>
                <Box
                  as="button"
                  onClick={() => setCategory(item?.name)}
                  h={20}
                >
                  <Image
                    boxSize="45px"
                    overflow={"hidden"}
                    objectFit="scale-down"
                    alignSelf={"center"}
                    borderRadius="lg"
                    src={item.img}
                  />
                  <Text size={{ base: "xs", md: "md", lg: "md" }}>
                    {item.name}
                  </Text>
                </Box>
              </VStack>
            );
          })
        : null}
    </Flex>
  );
};
