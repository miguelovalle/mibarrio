import React from "react";
import { Box, Container, Flex, Spacer, VStack } from "@chakra-ui/react";

export const RendRadio = ({
  option,
  init,
  order,
  setOrder,
  orderSum,
  setOrderSum,
}) => {
  let auxRadio = [...order[0]];
  let idx;
  const handleRadio = (item, price) => {
    if (auxRadio.length > 0) {
      init.map((element) => {
        idx = auxRadio.indexOf(element.item);
        console.log(idx);
        idx > -1 && auxRadio.splice(idx, 1);
        idx > -1 && price > 0 && setOrderSum(orderSum - Number(price));
      });
    }
    auxRadio.push(item);
    Number(price) > 0 && setOrderSum(orderSum + Number(price));
    setOrder([[...auxRadio], order[1], order[2]]);
  };

  return (
    <Container>
      {init.map((item) => (
        <VStack key={item.id} fontSize={"sm"} mt={2}>
          <Flex justify={"space-between"} w={"90%"} mx={30} align={"center"}>
            <Box display={"flex"} flexWrap={"wrap"}>
              {item.item}
            </Box>
            <Spacer />
            <Box>
              <input
                type={"radio"}
                name={option}
                onChange={() => {
                  handleRadio(item.item, item.price);
                }}
              />
            </Box>
          </Flex>
        </VStack>
      ))}
    </Container>
  );
};
