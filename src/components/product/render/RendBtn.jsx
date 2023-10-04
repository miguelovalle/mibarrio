import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { numberFormat } from "../../helpers/numberFormat";

export const RendBtn = ({ init, order, setOrder, orderSum, setOrderSum }) => {
  const [stateArray, setStateArray] = useState(init);
  let listAux = order[2];
  let qt = 0;
  const changeState = (id, qt) => {
    const updatedTotal = stateArray.map((element) => {
      if (element.id === id) {
        return { ...element, total: qt };
      }
      return element;
    });
    setStateArray(updatedTotal);
  };

  const handleRestBtn = (id, item, price, total) => {
    if (total > 0 && orderSum > price) {
      const newList = listAux.map((element) => {
        if (item === element.item) {
          qt = element.cantidad - 1;
          {
            /*update render status*/
          }
          changeState(id, qt);
          setOrderSum(orderSum - Number(price));
          return { cantidad: qt, item: item };
        }

        return element;
      });
      console.log(newList);
      {
        /*update order status*/
      }
      setOrder([order[0], order[1], [...newList]]);
      console.log(order);
    }
  };

  const handleSumBtn = (id, item, price, total) => {
    if (total === 0) {
      listAux = [...listAux, { cantidad: 1, item: item }];
      qt = 1;
      changeState(id, qt);
      setOrderSum(orderSum + Number(price));
      setOrder([order[0], order[1], [...listAux]]);
    }
    if (total > 0) {
      const newList = listAux.map((element) => {
        if (element.item === item) {
          qt = element.cantidad + 1;
          changeState(id, qt);
          setOrderSum(orderSum + Number(price));
          return { cantidad: qt, item: item };
        }
        return element;
        console.log(newList);
      });
      setOrder([order[0], order[1], [...newList]]);
      console.log(order);
    }
  };

  return (
    <Container>
      {stateArray.map((item) => (
        <VStack key={item.id} fontSize={"sm"} mt={2}>
          <Flex
            justify={"space-between"}
            w={"90%"}
            mx={30}
            align={"center"}
            wrap={"wrap"}
          >
            <Box display={"flex"} flexWrap={"wrap"}>
              {item.item}
            </Box>
            <Spacer />
            <Box>{item.price > 0 && numberFormat(item.price)}</Box>
            <ButtonGroup isAttached variant="outline" size={"xs"}>
              <Button
                borderRadius={("20px", "0px", "0px", "20px")}
                onClick={() => {
                  handleRestBtn(item.id, item.item, item.price, item.total);
                }}
              >
                -
              </Button>
              {item.total}
              <Button
                borderRadius={("20px", "0px", "0px", "20px")}
                onClick={() => {
                  handleSumBtn(item.id, item.item, item.price, item.total);
                }}
              >
                {" "}
                +{" "}
              </Button>
            </ButtonGroup>
          </Flex>
        </VStack>
      ))}
    </Container>
  );
};
