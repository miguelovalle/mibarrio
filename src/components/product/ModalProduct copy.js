import React, { useRef, useState } from 'react';

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

let listAgs = [];
export const ModalProduct = ({ product, isOpen, onClose }) => {
  const price = Number(product?.price);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemAcum, setItemAcum] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderCount, setOrderCount] = useState(1);
  const [totalList, settotalList] = useState([]);

  let listOne = useRef([]);
  let listCheck = useRef([]);
  let listBtn = useRef([]);
  let prevList = useRef([]);
  let indiceTot;
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    setOrderTotal(price);
  }, [price]);

  useEffect(() => {
    prevList.current = product?.aggregates.map(item =>
      item[1].map(element => {
        return element;
      })
    );
    settotalList(prevList.current);
  }, [product?.aggregates]);

  console.log(totalList);

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
                              onChange={e => {
                                listOne.length > 0 &&
                                  Number(subElement.price) > 0 &&
                                  setOrderTotal(
                                    orderTotal - Number(subElement.price)
                                  );
                                listOne = [];
                                listOne.push(element[0].title);
                                listOne.push(subElement.item);
                                Number(subElement.price) > 0 &&
                                  setOrderTotal(
                                    orderTotal + Number(subElement.price)
                                  );
                                console.log(listOne);
                              }}
                            />
                          ) : Number(element[0].maxItemsNum) !== 1 &&
                            subElement.price > 0 ? (
                            <ButtonGroup isAttached mx={30} variant="outline">
                              <Button
                                onClick={() => {
                                  prevList.current = totalList.map(item =>
                                    item.map((obj, index) => {
                                      indiceTot = index;
                                      if (obj.id === subElement.id) {
                                        return {
                                          ...obj,
                                          total: obj?.total + 1,
                                        };
                                      }
                                      return obj;
                                    })
                                  );
                                  settotalList(prevList.current);
                                  console.log(
                                    'state luego de click',
                                    totalList
                                  );
                                  setOrderTotal(
                                    orderTotal + Number(subElement?.price)
                                  );
                                }}
                              >
                                {console.log(indexL2)}
                                {`${totalList[indexL2]?.[indiceTot]?.['total']} + `}
                              </Button>
                              <Button
                                onClick={() => {
                                  if (
                                    itemAcum > 0 &&
                                    orderTotal > product.price
                                  ) {
                                    setItemAcum(itemAcum - 1);
                                    setOrderTotal(
                                      orderTotal - Number(subElement.price)
                                    );
                                  }
                                }}
                              >
                                -
                              </Button>
                            </ButtonGroup>
                          ) : (
                            <Checkbox
                              colorScheme="orange"
                              onChange={e => {
                                setOrderTotal(price);
                                const validaCheck = e.target.checked;
                                const valIndex = listAgs.indexOf(
                                  subElement.item
                                );
                                validaCheck
                                  ? setItemsCount(itemsCount + 1)
                                  : setItemsCount(itemsCount - 1);
                                console.log('contador de items', itemsCount);

                                if (validaCheck && valIndex === -1) {
                                  listAgs.push(subElement.item);
                                }
                                if (!valIndex && valIndex > -1) {
                                  listAgs.splice(valIndex, 1);
                                }

                                console.log('indice', valIndex);
                                console.log('arreglo', listAgs);
                                console.log('cuenta de items', itemsCount);
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

          <Button>{`agregar ${numberFormat(orderTotal)}`}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

/*  

                                  prevList = totalList.map(obj => {
                                    if (obj.id === element.id) {
                                      return { ...obj, total: obj.total + 1 };
                                    }
                                    return obj;
                                  });
                                  settotalList(prevList);
                                  console.log(totalList);
                                  setOrderTotal(
                                    orderTotal + Number(subElement.price)
                                  );


                        <Box>
                          {element[0].maxItemsNum === 1 ||
                          subElement.price === 0 ? (
                            <Checkbox
                              colorScheme="orange"
                              isChecked="false"
                              onFocus={e => {}}
                              onChange={e => {
                                setOrderTotal(price);
                                const validaCheck = e.target.checked;
                                const valIndex = listAgs.indexOf(
                                  subElement.item
                                );
                                validaCheck
                                  ? setItemsCount(itemsCount + 1)
                                  : setItemsCount(itemsCount - 1);
                                console.log('contador de items', itemsCount);

                                if (validaCheck && valIndex === -1) {
                                  listAgs.push(subElement.item);
                                }
                                if (!valIndex && valIndex > -1) {
                                  listAgs.splice(valIndex, 1);
                                }

                                validaCheck &&
                                itemsCount > element[0].maxItemsNum
                                  ? setDisabledItem(true)
                                  : setDisabledItem(false);

                                console.log('indice', valIndex);
                                console.log('arreglo', listAgs);
                                console.log('cuenta de items', itemsCount);
                              }}
                            />
                          ) : (
                            <ButtonGroup isAttached mx={30} variant="outline">
                              <Button
                                onClick={() => {
                                  if (itemAcum > 1) {
                                    setItemAcum(itemAcum - 1);
                                  }
                                }}
                              >
                                -
                              </Button>
                              <Button
                                onClick={() => {
                                  setItemAcum(itemAcum + 1);
                                  setOrderTotal(
                                    orderTotal + Number(subElement.price)
                                  );
                                }}
                              >{`${itemAcum} +`}</Button>
                            </ButtonGroup>
                          )}
                        </Box>


<Checkbox
                              colorScheme="orange"
                              isDisabled={disabledItem}
                              onChange={e => {
                                const validaCheck = e.target.checked;
                                const valIndex = listAgs.indexOf(
                                  subElement.item
                                );
                                console.log(
                                  validaCheck,
                                  valIndex,
                                  subElement.item
                                );
                                validaCheck
                                  ? setItemsCount(itemsCount + 1)
                                  : setItemsCount(itemsCount - 1);
                                console.log(itemsCount);
                                if (validaCheck && valIndex === -1) {
                                  listAgs.push(subElement.item);
                                }

                                setItemsCount(itemsCount + 1);
                                console.log(listAgs);
                              }}
                              onFocus={e => {
                                const validaCheck = e.target.checked;
                                validaCheck &&
                                itemsCount > element[0].maxItemsNum
                                  ? setDisabledItem(true)
                                  : setDisabledItem(false);
                              }}
                            />

                                                          onFocus={e => {
                                const obj = { item: subElement.item };
                                const total = { total: 0 };
                                listCount.current = [...obj, ...total];
                                console.log(listCount.current);
                              }}

 */
