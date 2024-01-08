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
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../components/helpers/numberFormat";
import { IoMdReturnLeft } from "react-icons/io";
import { useMutateAddOrder } from "../../hooks/orderHooks";
import { useForm } from "react-hook-form";
import { ProgressOrder } from "./render/ProgressOrder";
import { useRef, useState } from "react";

export const OrderSheet = () => {
  const navigate = useNavigate();

  let order = localStorage.getItem("orderId");

  const [dsblConfirm, setDsblConfirm] = useState(false);

  const orderId = useRef(order);

  const mutation = useMutateAddOrder();

  const { register, handleSubmit } = useForm();

  const toast = useToast();

  const orderItems = JSON.parse(sessionStorage.getItem("order"));
  const commerceId = JSON.parse(sessionStorage.getItem("commerceId"));
  const name = localStorage.getItem("name");
  const address = localStorage.getItem("address");

  let orderObj = {
    name: name,
    commerce: commerceId,
    address: address,
    changeMoney: "",
    dateOrder: +new Date(),
    changeTime: new Date().getHours() + ":" + new Date().getMinutes(),
    changeState: "En Cola",
    order: orderItems,
  };

  if (mutation.isSuccess) {
    orderId.current = mutation?.data?.orderId;
    localStorage.setItem("orderId", orderId.current);
    localStorage.setItem("dateOrder", new Date());
  }

  const onSubmit = (event) => {
    event.cash
      ? (orderObj.changeMoney = `Paga con: ${event.cash}`)
      : (orderObj.changeMoney = "");

    mutation.mutate(orderObj, {
      onError: () => {
        toast({
          title: "Inténtelo nuevamente",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        //const orderId = result.data.idOrder
        return toast({
          title: "La orden entra en proceso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    });
    //    localStorage.setItem("orderId", orderId.current);

    setDsblConfirm(true);
  };

  return (
    <Box w={[450, 800]} px={4}>
      <Card bgColor={"gray.50"} mb={4}>
        <CardHeader>
          <Flex bg={"orange.200"} p={4} m={4} direction={"column"}>
            <Flex direction={"row"} justifyContent={"center"}>
              <Button
                leftIcon={<IoMdReturnLeft />}
                variant="solid"
                borderRadius={"full"}
                size={"sm"}
                mx={4}
                colorScheme="blue"
                onClick={() => navigate(-2)}
              />
              <Heading
                display={"flex"}
                size={["sm", "lg"]}
                color={"blue.700"}
                flexWrap={"wrap"}
                alignContent={"center"}
              >
                {name}
              </Heading>
            </Flex>

            <Heading
              as={"h3"}
              display={"flex"}
              flexWrap={"wrap"}
              size={["sm", "lg"]}
              color={"blue.700"}
              justifyContent={"center"}
            >
              Confirmemos su
               Pedido
            </Heading>
          </Flex>
        </CardHeader>

        <CardBody>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            fontSize={"md"}
            mb={4}
          >
            Entregamos en: {address}
          </Box>
          <hr />
          <VStack divider={<StackDivider borderColor="gray.300" />} spacing={4}>
            {orderItems?.map((element, indexL1) => (
              <VStack key={indexL1}>
                <Flex justify={"flex-start"} mt={2}>
                  <Box> {element[0].cantidad} </Box>
                  <Box>{element[0].item} </Box>
                  <Spacer />
                  <Box>{numberFormat(element[0].price)} </Box>
                </Flex>
                <Box display={"flex"} flexWrap="wrap">
                  {element[1].length > 0 &&
                    `Con: ${element[1].toString()}  ${element[2].toString()} `}
                </Box>
                {element[3].map((ads, indexL2) => (
                  <HStack key={indexL2}>
                    <Text>{ads.cantidad} </Text>
                    <Text>{ads.item} </Text>
                  </HStack>
                ))}
              </VStack>
            ))}
          </VStack>
        </CardBody>

        <CardFooter>
          <VStack mb={4} fontSize={"sm"} justify={"center"}>
            <Box display={"flex"} w={[350, 600]} justifyContent={"center"}>
              Llevar cambio de:{" "}
            </Box>
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

                <label htmlFor="datafono">Datáfono</label>
                <input
                  {...register("cash")}
                  type="radio"
                  name="cash"
                  value={"datafono"}
                  id="datafono"
                />
              </HStack>
              <Button
                type="submit"
                w={"full"}
                mt={4}
                colorScheme="blue"
                isDisabled={dsblConfirm}
              >
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
      {mutation?.isSuccess && <ProgressOrder orderId={orderId.current} />}
    </Box>
  );
};
