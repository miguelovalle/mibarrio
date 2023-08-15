import { useState } from "react";

import {
  Image,
  Text,
  Flex,
  VStack,
  Spinner,
  Card,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Button,
  Container,
} from "@chakra-ui/react";

import { useProducts } from "../../hooks/productHooks";
import { useNavigate, useParams } from "react-router-dom";
import { numberFormat } from "../../components/helpers/numberFormat";
import { ModalProduct } from "./ModalProduct";
import { IoIosCart } from "react-icons/io";
//import { useQueryClient } from "@tanstack/react-query";
import { DialogLogin } from "./DialogLogin";

export const ProductList = () => {
  const { shopId } = useParams();

  //const queryClient = useQueryClient();

  //const user = queryClient.getQueryData(["login"]);

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [orderList, setOrderList] = useState([]);

  const [subTotal, setSubTotal] = useState(0);

  const [showTotal, setshowTotal] = useState("none");

  const [showModal, setShowModal] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const { isLoading, data, isError, isSuccess, error } = useProducts(shopId);
  const products = data?.products;
  const closeModal = () => setShowModal(false);

  const closeDialog = () => setShowDialog(false);

  const handleOrder = () => {
    sessionStorage.setItem("order", JSON.stringify(orderList));
    const userid = localStorage.getItem("id");
    userid ? navigate("/order") : setShowDialog(true);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return console.log(error);
    //`error: ${error}`;
  }
  if (isSuccess) {
    if (data.ok === "false") {
      return console.log("no hay productos para mostrar");
    } else {
      return (
        <Container>
          <Card>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Flex wrap="wrap">
                    {products?.map((item) => (
                      <Flex
                        key={item._id}
                        justify="flex-start"
                        w="400px"
                        bg="orange.100"
                        border="1px solid tomato.200"
                        padding={5}
                        m="0.5"
                      >
                        <a
                          href="#"
                          onClick={() => {
                            setProduct(item);
                            setShowModal(true);
                          }}
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
                              <Text fontSize="xl">{item.name}</Text>
                              <Text fontSize="small">{item.description}</Text>
                              <Text fontSize="small">
                                {numberFormat(item.price)}
                              </Text>
                            </VStack>
                          </Flex>
                        </a>
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              </Stack>
            </CardBody>

            <Flex direction="column" w="full"></Flex>
            <CardFooter>
              <Button
                display={showTotal}
                leftIcon={<IoIosCart />}
                onClick={() => handleOrder()}
              >
                {`Lanzar Pedido por ${numberFormat(subTotal)}`}
              </Button>
            </CardFooter>
            <DialogLogin isOpen={showDialog} onClose={closeDialog} />
            <ModalProduct
              product={product}
              isOpen={showModal}
              onClose={closeModal}
              orderList={orderList}
              setOrderList={setOrderList}
              setSubTotal={setSubTotal}
              setshowTotal={setshowTotal}
            />
          </Card>
        </Container>
      );
    }
  }
};
