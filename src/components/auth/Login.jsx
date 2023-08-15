import { useState } from "react";
import {
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
  Center,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { PageHeader } from "../comercio/PageHeader";
import { BiEnvelope } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useLogin } from "../../hooks/loginHooks";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [show, setshow] = useState(false); //show password characters

  const [msg, setmsg] = useState(null); //show error

  const [mail, setMail] = useState({ mail: "", password: "" });

  const [hasMail, setHasMail] = useState(false); //enabled/disabled the usequery

  const { data, isSuccess } = useLogin(mail, hasMail);

  const handleClick = () => setshow(!show);

  const onSubmit = (e) => {
    setMail({ email: e.email, password: e.password });
    setHasMail(true);
  };

  if (isSuccess === true) {
    if (data?.ok === true) {
      localStorage.setItem("id", data?.id);
      localStorage.setItem("address", data?.address[0]?.address);
      const coord = JSON.stringify(data?.address[0]?.coords);
      localStorage.setItem("coords", coord);
      navigate("/");
    }
  }

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader pageTitle={"Ingresar a Plataforma"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiEnvelope />}
                  />
                  <Input
                    type="text"
                    placeholder="Correo Electrónico"
                    borderColor="gray.400"
                    {...register("email", {
                      required: "El correo es obligatorio",
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    borderColor="gray.400"
                    placeholder="Contraseña"
                    {...register("password", {
                      required: "La Contraseña es obligatoria",
                    })}
                  />
                  <InputRightElement>
                    <Button
                      leftIcon={<BiHide />}
                      variant="outline"
                      size="md"
                      onClick={handleClick}
                    ></Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                mt={6}
                w="100%"
              >
                Ingresar
              </Button>
              <Link href="">Olvidé mi contraseña</Link>
              <Link to={"/registro"}>Registrar/Actualizar mis Datos</Link>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Flex>
  );
};