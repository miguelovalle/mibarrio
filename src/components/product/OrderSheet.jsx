import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
//import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../components/helpers/numberFormat";
import { IoMdReturnLeft } from "react-icons/io";
import { useMutateAddOrder } from "../../hooks/orderHooks";
import { useUserDetail } from "../../hooks/loginHooks";
import { useForm } from "react-hook-form";

export const OrderSheet = () => {
  const navigate = useNavigate();
  //const queryClient = useQueryClient();
  //  const uid = localStorage.getItem("id");
  //  const { data, isSuccess, isLoading, error, refetch } = useUserDetail(uid);
  const order = false;
  //const user = queryClient.getQueryData(["login"]);
  const toast = useToast();

  const { register, handleSubmit } = useForm();

  const orderItems = JSON.parse(sessionStorage.getItem("order"));
  const name = localStorage.getItem("name");
  const address = localStorage.getItem("address");

  //const address= data?.address[0],direccion

  // const name = data?.name
  let orderObj = {
    name: name,
    address: address,
    changeMoney: "",
    order: orderItems,
  };

  const onSubmit = (event) => {
    orderObj.changeMoney = `Levar cambio de ${event.cash}`;
    mutate(orderObj, {
      onError: () => {
        toast({
          title: "Inténtelo nuevamente",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          title: "La orden entra en proceso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      },
    });
  };

  return (
    <Container>
      <VStack>
        <Card>
          <CardHeader>
            <Flex>
              <Button
                leftIcon={<IoMdReturnLeft />}
                variant="ghost"
                onClick={() => navigate(-2)}
              />
              <Heading size="md">{name}, confirmemos su pedido</Heading>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>Entregaremos en: {address}</Text>
          </CardBody>
          <CardFooter>
            <Button>Cambiar Dirección</Button>
            <Button>Vaciar la Canasta</Button>
          </CardFooter>
        </Card>

        <Heading>Estado de su Orden</Heading>
        <Flex direction={"column"}>
          {orderItems?.map((element, indexL1) => (
            <VStack key={indexL1}>
              <HStack>
                <Box>{element[0].item} </Box>
                <Box>{numberFormat(element[0].price)} </Box>
              </HStack>
              <Text> {`Con: ${element[1].toString()}`} </Text>
              {element[2].map((ads, indexL2) => (
                <HStack key={indexL2}>
                  <Text>{ads.cantidad} </Text>
                  <Text>{ads.item} </Text>
                </HStack>
              ))}
            </VStack>
          ))}
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack>
            <Text>Llevar cambio de: </Text>
            <label htmlFor="cien">Cien</label>
            <input
              {...register("cash")}
              type="radio"
              name="cash"
              value={"100"}
              id="cien"
            />

            <label htmlFor="cincuenta">Cincuenta</label>
            <input
              {...register("cash")}
              type="radio"
              name="cash"
              value={"50"}
              id="cincuenta"
            />

            <label htmlFor="veinte">Veinte</label>
            <input
              {...register("cash")}
              type="radio"
              name="cash"
              value={"20"}
              id="veinte"
            />
          </HStack>
          <Button type="submit">confirmar pedido</Button>
        </form>
      </VStack>
    </Container>
  );
};
