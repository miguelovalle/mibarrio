import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../components/helpers/numberFormat";
import { IoMdReturnLeft } from "react-icons/io";
import { useMutateAddOrder } from "../../hooks/orderHooks";
import { useForm } from "react-hook-form";

export const OrderSheet = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const result = useMutateAddOrder();
  const { register, handleSubmit } = useForm();

  const orderItems = JSON.parse(sessionStorage.getItem("order"));
  const name = localStorage.getItem("name");
  const address = localStorage.getItem("address");

  let orderObj = {
    name: name,
    address: address,
    changeMoney: "",
    order: orderItems,
    dateOrder: new Date(),
  };

  const onSubmit = (event) => {
    orderObj.changeMoney = `Levar cambio de ${event.cash}`;
    result.mutate(orderObj, {
      onError: () => {
        toast({
          title: "Inténtelo nuevamente",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        result.data === "ok" &&
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
    <Box w={"450px"} justifyContent={"center"} bg={"red"} px={14}>
      <Card bgColor={"gray.50"} mb={4} justify={"center"}>
        <CardHeader>
          <Flex bg={"orange.200"} p={4} m={4}>
            <Button
              leftIcon={<IoMdReturnLeft />}
              variant="solid"
              borderRadius={"full"}
              size={"sm"}
              colorScheme="blue"
              onClick={() => navigate(-2)}
            />
            <Spacer />
            <Heading size="sm" mx={4} color={"blue.700"}>
              {name} Confirmemos su Pedido
            </Heading>
          </Flex>
        </CardHeader>

        <CardBody>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            fontSize={"sm"}
          >
            Entregamos en: {address}
          </Box>
          <Flex direction={"column"}>
            {orderItems?.map((element, indexL1) => (
              <VStack key={indexL1}>
                <HStack>
                  <Box> {element[0].cantidad} </Box>
                  <Box>{element[0].item} </Box>
                  <Box>{numberFormat(element[0].price)} </Box>
                </HStack>
                <Text
                  fontSize={"sm"}
                >{`Con: ${element[1].toString()}  ${element[2].toString()} `}</Text>
                {element[3].map((ads, indexL2) => (
                  <HStack key={indexL2}>
                    <Text>{ads.cantidad} </Text>
                    
                    <Text>{ads.item} </Text>
                  </HStack>
                ))}
              </VStack>
            ))}
          </Flex>
        </CardBody>

        <CardFooter>
          <VStack mb={4} fontSize={"sm"} justify={"center"}>
            <Box justifyContent={"center"}> Llevar cambio de: </Box>
            <form onSubmit={handleSubmit(onSubmit)} my={4}>
              <HStack>
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
              <Button type="submit" w={"full"} mt={4} colorScheme="blue">
                confirmar pedido
              </Button>
            </form>
            <HStack spacing={4} justify={"center"}>
              <Button colorScheme="blue" size={"sm"}>
                Cambiar Dirección
              </Button>

              <Button colorScheme="blue" size={"sm"}>
                Vaciar la Canasta
              </Button>
            </HStack>{" "}
          </VStack>
        </CardFooter>
      </Card>
    </Box>
  );
};
