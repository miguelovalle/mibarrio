import React, { useState } from 'react';

import {
  Image,
  Text,
  Flex,
  VStack,
  Spinner,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Container,
} from '@chakra-ui/react';

import { useProducts } from '../../hooks/shopHooks';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../helpers/numberFormat';
import { ModalProduct } from '../product/ModalProduct';

export const ProductList = () => {
  const { shopId } = useParams();
  const [product, setProduct] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [aggList, setAggList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, isError, isSuccess, error } = useProducts(shopId);

  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const products = data?.products;
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return console.log(error);
    //`error: ${error}`;
  }
  if (isSuccess) {
    if (data.ok === 'false') {
      return console.log('no hay productos para mostrar');
    }

    return (
      <Container>
        <Flex direction="column" w="full">
          <h1>lista de prodcutos</h1>
          <Flex wrap="wrap">
            {products?.map(item => (
              <LinkBox key={item._id}>
                <Flex
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
                      src={item.logo}
                      alt={item.logo}
                    />
                    <VStack w="300px">
                      <LinkOverlay href="#">
                        <Text
                          as="a"
                          href="#"
                          fontSize="xl"
                          onClick={() => {
                            setProduct(item);
                            onOpen();
                          }}
                        >
                          {item.name}
                        </Text>
                      </LinkOverlay>

                      <Text fontSize="small">{item.description}</Text>
                      <Text fontSize="small">{numberFormat(item.price)}</Text>
                    </VStack>
                  </Flex>
                </Flex>
              </LinkBox>
            ))}
          </Flex>
        </Flex>
        
        <ModalProduct
          product={product}
          isOpen={isOpen}
          onClose={onClose}
          orderList={orderList}
          setOrderList={setOrderList}
          setAggList={setAggList}
        />
      </Container>
    );
  }
};
