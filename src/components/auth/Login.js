import React, { useEffect, useRef, useState } from 'react';
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
  Spinner,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
//import { useDispatch } from 'react-redux';
import { PageHeader } from '../comercio/PageHeader';
import { BiEnvelope } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
//import { startLogin } from '../../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/loginHooks';

export const Login = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setshow] = useState(false);

  const [msg, setmsg] = useState(null);

  const mail = useRef({ email: null, password: null });

  const { data, isSuccess, isLoading, error, refetch } = useLogin(mail.current);

  const handleClick = () => setshow(!show);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      if (data.ok === true) {
        localStorage.setItem('token', data?.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        navigate(-1);
      }
    } else {
      setmsg('error de comunicación. POr favor, intente de nuevo mas tarde');
    }
  }, [data?.ok, data?.token, isSuccess, refetch, navigate]);

  const onSubmit = e => {
    mail.current = { email: e.email, password: e.password };
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader pageTitle={'Ingresar a Plataforma'} />
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
                    {...register('email', {
                      required: true,
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
                    type={show ? 'text' : 'password'}
                    borderColor="gray.400"
                    placeholder="Contraseña"
                    {...register('password', {
                      required: true,
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

              {isLoading && <Spinner />}
              {error && msg}

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                mt={6}
                w="100%"
              >
                Ingresar
              </Button>
            </VStack>
          </form>
          <Link to="/auth/Pag1">Registrar un nuevo Negocio</Link>
        </VStack>
      </Center>
    </Flex>
  );
};
