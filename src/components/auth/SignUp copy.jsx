import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Grid,
  HStack,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { AddressModal } from "../address/AddressModal";
import { PageHeader } from "../comercio/PageHeader";
import { useAdduser } from "../../hooks/loginHooks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  let message, stat;

  const toast = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const dataUser = queryClient.getQueryData(["user"]);

  const result = useAdduser();

  // estates to handle edition of profile user
  const [showModal, setshowModal] = useState(true);
  const [correo, setCorreo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [celular, setcelular] = useState("");

  if (!!dataUser) {
    const { id, name, address, phone, email } = dataUser.userInf;
    setFirstName(name.firstName);
    setLastName(name.lastName);
    setCorreo(email);
    setDomicilio(address.address);
    setcelular(phone);
    reset({
      nombres: firstName,
      apellidos: lastName,
      email: correo,
      direccion: domicilio,
      celular: celular,
    });
  }

  /*   if (result.isError) {
    toast({
      title: result.error,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  if (result.isSuccess) {
    if (result.data.ok === true) {
      message = "Registro Exitoso";
      stat = "success";
    }
  } */
  const onSubmit = (e) => {
    // construct user oject to send to db
    const user = {
      name: {
        firstName: e.nombres,
        lastName: e.apellidos,
      },
      address: [
        {
          city: "Bogota",
          address: localStorage.getItem("address"),
          coords: JSON.parse(localStorage.getItem("coords")),
          siteName: e.siteName,
        },
      ],
      phone: e.celular,
      email: e.email,
      password: e.password,
    };

    result.mutate(
      { user },
      {
        onError: () => {
          toast({
            title: "No se completó la operación. Vuelva a intentarlo",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: (data) => {
          if (data?.ok === true) {
            message = "Registro Exitoso";
            stat = "success";
          } else {
            message = "Hubo un problema al registrar el usuario.";
            stat = "warning";
          }
          toast({
            title: message,
            status: stat,
            duration: 5000,
            isClosable: true,
          });
          localStorage.setItem("id", data.uid);
          navigate("/shops");
        },
      }
    );
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader pageTitle={"Registro de Nuevo Usuario"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <label htmlFor="nombres">Nombres </label>
              <FormControl>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register("nombres", {
                    required: true,
                    message: "campo obligatorio",
                  })}
                />
                <FormErrorMessage>
                  {errors.nombres && errors.nombres.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="apellidos">Apellidos </label>
              <FormControl>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register("apellidos", { required: "Campo Obligatorio" })}
                />
                <FormErrorMessage>
                  {errors.apellidos && errors.apellidos.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="email">Correo Electrónico </label>
              <FormControl isInvalid={errors.email}>
                <Input
                  type="email"
                  borderColor="gray.400"
                  {...register("email", { required: "Campo Inválido" })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="celular">Celular</label>
              <FormControl isInvalid={errors.celular}>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Ingrese solo números"
                  {...register("celular", {
                    required: "Campo Obligatorio",
                    maxLength: { value: 10, message: "Máximo 10 digitos" },
                    minLength: {
                      value: 7,
                      message: "Mínimo 7 digitos cuando es teléfono fijo",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.celular && errors.celular.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="password">Contraseña</label>
              <FormControl isInvalid={errors.password}>
                <Input
                  type="password"
                  borderColor="gray.400"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Mínimo 6 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="password2">Confirmar Contraseña</label>
              <FormControl isInvalid={errors.password2}>
                <Input
                  type="password"
                  borderColor="gray.400"
                  {...register("password2", {
                    required: "Confirme la Contraseña",
                    validate: {
                      coincidePswAnterior: (value) => {
                        const { password } = getValues();
                        return (
                          password === value ||
                          "Las contraseñas deben coincidir"
                        );
                      },
                    },
                    minLength: { value: 6, message: "Mínimo 6 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password2 && errors.password2.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            {result.isLoading && <Spinner />}
            {result.fetchStatus === "fetching" && <Spinner />}
            <HStack mt={4} w={"100%"}>
              <Button type="submit" colorScheme="blue" w={220} size="lg">
                Registrarse
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                w={220}
                onClick={() => navigate(-1)}
              >
                Regresar
              </Button>
            </HStack>
          </form>
        </VStack>
      </Center>
      <AddressModal showModal={showModal} setshowModal={setshowModal} />
    </Flex>
  );
};
