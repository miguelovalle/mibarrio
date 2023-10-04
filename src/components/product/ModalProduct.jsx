import { useState } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Flex,
  Spacer,
  Box,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";

import { numberFormat } from "../../components/helpers/numberFormat";
import { useEffect } from "react";
import { RendChecks } from "./render/RendChecks";
import { RendRadio } from "./render/RendRadio";
import { RendBtn } from "./render/RendBtn";

export const ModalProduct = ({
  product,
  isOpen,
  onClose,
  orderList,
  setOrderList,
  subTotal,
  setSubTotal,
  setshowTotal,
}) => {
  //  const [order, dispatch] = useReducer(orderReducer, [[], [], []]);
  const [order, setOrder] = useState([[], [], []]);
  const [orderSum, setOrderSum] = useState(0);
  const [orderCount, setOrderCount] = useState(1);
  const price = Number(product?.price);
  let initState = [];

  const stateList = (element) => {
    initState = [];
    element?.map((item) => {
      newValue = {
        id: item.id,
        item: item.name,
        price: item.price,
        check: false,
        total: 0,
      };
      return initState.push(newValue);
    });
  };

  useEffect(() => {
    setOrderSum(price);
  }, [price]);
  let newValue;

  const handleOrder = () => {
    const element = {
      cantidad: orderCount,
      item: product?.name,
      price: orderSum,
    };
    setOrderList([...orderList, [element, ...order]]);
    setSubTotal(subTotal + orderSum);
    setshowTotal("inline");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody mt={5}>
          <Flex direction={"column"}>
            <Flex direction={"row"} justifyContent="flex-start">
              <Box my={15} flexWrap={"wrap"} fontSize={"xl"}>
                {product?.name}
              </Box>
              <Spacer />
              <Box my={15}>{numberFormat(product?.price)}</Box>
            </Flex>
            {product?.description}
            {/*loop over the product aggregates*/}
            {product?.aggregates?.map((element, indexL1) => (
              <Card key={indexL1} my={5}>
                <CardHeader>
                  <Box
                    bg={"orange.400"}
                    color={"white"}
                    borderRadius="lg"
                    p={4}
                  >
                    <VStack direction={"column"}>
                      <Text>{element[0].title}</Text>
                      {Number(element[0].minItemsNum) > 0 && (
                        <Text>
                          Seleccion obligatoria de mínimo{" "}
                          {element[0].minItemsNum}{" "}
                        </Text>
                      )}
                      {Number(element[0].maxItemsNum) > 0 && (
                        <Text>
                          Seleccion obligatoria de máximo{" "}
                          {element[0].maxItemsNum}{" "}
                        </Text>
                      )}{" "}
                      <Text size={"sm"}>{element[0].subtitle} </Text>
                    </VStack>
                  </Box>
                </CardHeader>
                <CardBody>
                  {/*calculate the init state of items selected*/}
                  {stateList(element[1])}
                  {element[0].typeSelect === "radio" && (
                    <RendRadio
                      option={element[0].title.slice(0, 6)}
                      init={initState}
                      order={order}
                      setOrder={setOrder}
                      orderSum={orderSum}
                      setOrderSum={setOrderSum}
                    />
                  )}
                  {element[0].typeSelect === "checkbox" && (
                    <RendChecks
                      init={initState}
                      max={element[0].maxItemsNum}
                      order={order}
                      setOrder={setOrder}
                    />
                  )}
                  {element[0].typeSelect === "Btn" && (
                    <RendBtn
                      init={initState}
                      order={order}
                      setOrder={setOrder}
                      orderSum={orderSum}
                      setOrderSum={setOrderSum}
                    />
                  )}
                </CardBody>
              </Card>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup isAttached mx={30} variant="outline">
            <Button
              onClick={() => {
                if (orderCount > 1 && orderSum > price) {
                  setOrderCount(orderCount - 1);
                  setOrderSum(orderSum - price);
                }
              }}
            >
              -
            </Button>
            <Button
              onClick={() => {
                setOrderCount(orderCount + 1);
                setOrderSum(orderSum + price);
              }}
            >{`${orderCount} +`}</Button>
          </ButtonGroup>

          <Button onClick={() => handleOrder()}>{`agregar ${numberFormat(
            orderSum
          )}`}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
