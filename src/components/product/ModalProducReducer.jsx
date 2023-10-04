import { useReducer, useState } from "react";
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
  Checkbox,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";

import { numberFormat } from "../helpers/numberFormat";
import { useEffect } from "react";
import { wrap } from "framer-motion";
import orderReducer from "../reducers/orderReducer";z

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
  const [order, dispatch] = useReducer(orderReducer, [[], [], []]);
  const [orderSum, setOrderSum] = useState(0);
  const price = Number(product?.price);
  const [orderCount, setOrderCount] = useState(1);
  let itemsCount = order[1].length;

  useEffect(() => {
    setOrderSum(price);
  }, [price]);

  const handleRadio = (subElement) => {
    dispatch({
      type: "listRadio",
      payload: subElement,
      total: setOrderSum,
    });
  };

  const handleCheck = (checked, subElement, maxItems) => {
    dispatch({
      type: "listCheck",
      payload: subElement,
      checked: checked,
      itemsCount: itemsCount,
      maxItems: maxItems,
    });
    setOrderSum(orderSum + Number(subElement.price));
  };

  const handleRestBtn = (subElement) => {
    if (subElement.total > 0 && orderSum > price) {
      dispatch({
        type: "listRest",
        payload: subElement,
      });
      subElement.total = subElement.total - 1;
      setOrderSum(orderSum - Number(subElement?.price));
    }
  };

  const handleSumBtn = (subElement) => {
    if (subElement.total === 0) {
      dispatch({
        type: "addList",
        payload: subElement,
      });
    }
    if (subElement.total > 0) {
      dispatch({
        type: "updateList",
        payload: subElement,
      });
    }
    subElement.total = subElement.total + 1;
    setOrderSum(orderSum + Number(subElement?.price));
  };
  const handleOrder = () => {
    const element = {
      cantidad: orderCount,
      item: product?.name,
      price: product?.price,
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

            {product?.aggregates?.map((element, indexL1) => (
              <Card key={indexL1} my={5}>
                <CardHeader>
                  <Box
                    bg={"orange.400"}
                    color={"white"}
                    borderRadius="lg"
                    p={4}
                  >
                    <Flex direction={"row"}>
                      {element[0].title}
                      <Spacer />
                      {Number(element[0].minItemsNum) > 0 ||
                      Number(element[0].maxItemsNum) > 0 ? (
                        <Text bg={"orange.400"} color={"white"}>
                          Obligatorio
                        </Text>
                      ) : (
                        ""
                      )}
                      
                    </Flex>
                    <Text size={"sm"}>{element[0].subtitle} </Text>
                  </Box>
                </CardHeader>

                <CardBody>
                  {element[1]?.map((subElement, indexL2) => (
                    <VStack key={indexL2} mt={5} fontSize={"sm"}>
                      <Flex
                        justify={"space-between"}
                        w={"90%"}
                        mx={30}
                        align={"center"}
                        wrap={wrap}
                      >
                        <Box display={"flex"} flexWrap={"wrap"}>
                          {subElement.item}
                        </Box>
                        <Spacer />
                        <Box>
                          {subElement.price > 0 &&
                            numberFormat(subElement.price)}
                        </Box>

                        <Box>
                          {Number(element[0].maxItemsNum) === 1 ? (
                            <input
                              type={"radio"}
                              name="opc"
                              onChange={() => {
                                handleRadio(subElement);
                              }}
                            />
                          ) : Number(element[0].maxItemsNum) !== 1 &&
                            subElement.price > 0 ? (
                            <ButtonGroup
                              isAttached
                              variant="outline"
                              size={"xs"}
                            >
                              <Button
                                borderRadius={("20px", "0px", "0px", "20px")}
                                onClick={() => {
                                  handleRestBtn(subElement);
                                }}
                              >
                                -
                              </Button>
                              <Button>{subElement.total} </Button>
                              <Button
                                borderRadius={("20px", "0px", "0px", "20px")}
                                onClick={() => {
                                  handleSumBtn(subElement);
                                }}
                              >
                                {" "}
                                +{" "}
                              </Button>
                            </ButtonGroup>
                          ) : (
                            <Checkbox
                              colorScheme="orange"
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const maxItems = element[0].maxItemsNum;
                                handleCheck(checked, subElement, maxItems);
                              }}
                            />
                          )}
                        </Box>
                      </Flex>
                    </VStack>
                  ))}
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
