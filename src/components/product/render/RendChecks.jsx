import { useState } from "react";
import {
  Box,
  Checkbox,
  Container,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";

export const RendChecks = ({ init, max, order, setOrder }) => {
  const [stateArray, setStateArray] = useState(init);

  let auxCheck = [...order[1]];

  const changeState = (id, checked) => {
    const updatedCheck = stateArray.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, check: checked };
      }
      return checkbox;
    });
    setStateArray(updatedCheck);
  };

  const append = (item, checked) => {
    const valIndex = auxCheck.indexOf(item); // if the item is already in the list, retrieve the index
    if (checked && valIndex === -1) {
      // -1 if not found
      auxCheck = [...auxCheck, item];
    }
    if (!checked && valIndex > -1) {
      auxCheck.splice(valIndex, 1);
    }
  };

  const handleCheck = (id, item, checked) => {
    const itemsInTrue = stateArray.filter((element) => element.check == true);
    const itemsCount = itemsInTrue.length;
    {
      /*count checks with true*/
    }
    if (max === 0 || (max > 0 && itemsCount < max)) {
      append(item, checked);
      changeState(id, checked);
    } else if (max > 0 && itemsCount >= max) {
      changeState(id, false);
    }
    setOrder([order[0], [...auxCheck], order[2]]);
    //limpiar
  };

  return (
    <Container>
      {stateArray.map((element) => (
        <VStack key={element.id} fontSize={"sm"} mt={2}>
          <Flex justify={"space-between"} w={"90%"} mx={30} align={"center"}>
            <Box display={"flex"} flexWrap={"wrap"}>
              {element.item}
            </Box>
            <Spacer />
            <Box>{element.price > 0 && numberFormat(element.price)}</Box>
            <Checkbox
              colorScheme="orange"
              isChecked={element.check}
              onChange={(e) => {
                const checked = e.target.checked;
                handleCheck(element.id, element.item, checked);
              }}
            />
          </Flex>
        </VStack>
      ))}
    </Container>
  );
};
