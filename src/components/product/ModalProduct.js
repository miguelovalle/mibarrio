import React, { useState } from 'react';

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
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
  Checkbox,
  Button,
  Heading,
  Text,
  ButtonGroup,
} from '@chakra-ui/react';

import { numberFormat } from '../../helpers/numberFormat';
import { useEffect } from 'react';

export const ModalProduct = ({
  product,
  isOpen,
  onClose,
  orderList,
  setOrderList,
  setAggList,
}) => {
  const price = Number(product?.price);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderCount, setOrderCount] = useState(1);
  const [listBtn, setlistBtn] = useState([]);
  let itemsCount = 0;
  let listOne = [];
  let listCheck = [];
  let foundElements = false;
  let listAux = [];

  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  useEffect(() => {-b 
    setOrderTotal(price);
  }, [price]);

  const handleRadio = (subElement, title) => {
    listOne.length > 0 &&
      Number(subElement.price) > 0 &&
      setOrderTotal(orderTotal - Number(subElement.price));
    listOne = [];
    listOne.push(title, subElement.item);
    Number(subElement.price) > 0 &&
      setOrderTotal(orderTotal + Number(subElement.price));
    console.log('lista luego del click', listOne);
  };

  const handleCheck = (e, price, subElement) => {
    setOrderTotal(price);
    const validaCheck = e.target.checked;
    const valIndex = listCheck.indexOf(subElement.item);
    if (validaCheck && valIndex === -1) {
      itemsCount = itemsCount + 1;
      listCheck.push(subElement.item);
    }
    if (!validaCheck && valIndex > -1) {
      itemsCount = itemsCount - 1;
      listCheck.splice(valIndex, 1);
    }
    console.log(listCheck);
  };

  const handleRestBtn = (subElement, price) => {
    const listAux = [...listBtn];
    if (subElement.total > 0 && orderTotal > price) {
      listAux.forEach(element => {
        if (subElement.item === element.item) {
          element.cantidad = element.cantidad - 1;
        }
      });
      setlistBtn([...listAux]);
      console.log(listBtn);
      subElement.total = subElement.total - 1;
      //  setItemAcum(itemAcum - 1);
      setOrderTotal(orderTotal - Number(subElement.price));
    }
  };

  const handleSumBtn = subElement => {
    foundElements = false;
    listAux = [...listBtn];
    listAux.forEach(element => {
      if (subElement.item === element.item) {
        element.cantidad = element.cantidad + 1;
        foundElements = true;
      }
    });
    !foundElements &&
      listAux.push({
        cantidad: subElement.total + 1,
        item: subElement.item,
      });
    setlistBtn([...listAux]);

    subElement.total = subElement.total + 1;
    setOrderTotal(orderTotal + Number(subElement?.price));
    console.log(listBtn);
  };

  const handleOrder = () => {
    setOrderList([
      ...orderList,
      ...{ cantidad: orderCount, item: product?.name, price: product?.price },
    ]);
    setAggList([...listOne, ...listCheck, ...listBtn]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction={'column'} mt={6}>
            <Flex direction={'row'} justifyContent="flex-start">
              <Box
                my={15}
                maxW={'35em'}
                borderWidth="1px"
                borderRadius="lg"
                fontSize={'xl'}
              >
                {product?.name}
              </Box>
              <Spacer />
              <Box my={15}>{numberFormat(product?.price)}</Box>
            </Flex>
            {product?.description}

            {product?.aggregates.map((element, indexL1) => (
              <Card key={indexL1}>
                <CardHeader>
                  <Box bg={'orange.400'} color={'white'}>
                    {element[0].title}
                  </Box>

                  <Spacer />
                  {Number(element[0].minItemsNum) > 0 ||
                  Number(element[0].maxItemsNum) > 0 ? (
                    <Text bg={'orange.400'} color={'white'}>
                      Obligatorio
                    </Text>
                  ) : (
                    ''
                  )}
                </CardHeader>
                <CardBody>
                  <Heading size={'md'}>{element[0].subtitle} </Heading>
                  {element[1]?.map((subElement, indexL2) => (
                    <VStack key={indexL2}>
                      <HStack>
                        <Box>{subElement.item}</Box>
                        <Spacer />
                        <Box>
                          {Number(element[0].maxItemsNum) === 1 ? (
                            <input
                              type={'radio'}
                              name="opc"
                              onChange={() => {
                                handleRadio(subElement, element[0].title);
                              }}
                            />
                          ) : Number(element[0].maxItemsNum) !== 1 &&
                            subElement.price > 0 ? (
                            <ButtonGroup isAttached mx={30} variant="outline">
                              <Button
                                onClick={() => {
                                  handleRestBtn(subElement, product?.price);
                                }}
                              >
                                -
                              </Button>
                              <Text>{subElement.total} </Text>
                              <Button
                                onClick={() => {
                                  handleSumBtn(subElement);
                                }}
                              >
                                {' '}
                                +{' '}
                              </Button>
                            </ButtonGroup>
                          ) : (
                            <Checkbox
                              colorScheme="orange"
                              onChange={e => {
                                handleCheck(e, price, subElement);
                              }}
                            />
                          )}
                        </Box>
                      </HStack>
                      <Box>
                        {subElement.price > 0 && numberFormat(subElement.price)}
                      </Box>
                    </VStack>
                  ))}
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup isAttached mx={30} variant="outline">
            <Button
              onClick={() => {
                if (orderCount > 1) {
                  setOrderCount(orderCount - 1);
                  setOrderTotal(orderTotal - price);
                }
              }}
            >
              -
            </Button>
            <Button
              onClick={() => {
                setOrderCount(orderCount + 1);
                setOrderTotal(orderTotal + price);
              }}
            >{`${orderCount} +`}</Button>
          </ButtonGroup>

          <Button onclick={handleOrder}>{`agregar ${numberFormat(
            orderTotal
          )}`}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
