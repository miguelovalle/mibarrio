import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
} from '@chakra-ui/react';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { AddressModal } from '../address/AddressModal';
import { PageHeader } from '../comercio/PageHeader';
import { useAdduser } from '../../hooks/loginHooks';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [showModal, setshowModal] = useState(false);
  const [correo, setCorreo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [direccion, setDireccion] = useState(localStorage.getItem('address'));

  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAdduser();

  let message, stat;

  // useEffect rellena el formulario con los datos de botones face y google
  useEffect(() => {
    !direccion ? setshowModal(true) : setDomicilio(direccion);
    reset({
      nombres: firstName,
      apellidos: lastName,
      email: correo,
      direccion: domicilio,
    });
  }, [firstName, lastName, correo, domicilio, direccion, reset]);

  const responseFacebook = response => {
    setFirstName(response.first_name);
    setLastName(response.last_name);
    setCorreo(response.email);
  };

  const responseGoogle = response => {
    setFirstName(response.profileObj.givenName);
    setLastName(response.profileObj.familyName);
    setCorreo(response.profileObj.email);
  };

  const onSubmit = e => {
    const coord = localStorage.getItem('long');
    if (coord) {
      const user = {
        name: {
          nombres: e.nombres,
          apellidos: e.apellidos,
        },
        address: [
          {
            lugar: 'Bogota',
            direccion: localStorage.getItem('address'),
            coordenadas: [
              Number(localStorage.getItem('long')),
              Number(localStorage.getItem('lat')),
            ],
          },
        ],
        celular: e.celular,
        email: e.email,
        password: e.password,
      };
      console.log('user', user);
      mutate(user, {
        onError: () => {
          toast({
            title: 'No se completó la operación. Vuelva a intentarlo',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: data => {
          if (data?.ok) {
            message = 'Registro Exitoso';
            stat = 'success';
          } else {
            message = data?.msg;
            stat = 'warning';
          }
          toast({
            title: message,
            status: stat,
            duration: 5000,
            isClosable: true,
          });
        },
      });
    } else {
      setshowModal(true);
    }
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader pageTitle={'Registro de Nuevo Usuario'} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <GoogleLogin
                clientId="589728940404-vctiu7p77aptbltv72cd4qfu385h8i4h.apps.googleusercontent.com"
                buttonText="Registrarse con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <FacebookLogin
                appId="711431329681786"
                autoLoad={false}
                fields="first_name, last_name, email "
                //          onClick={componentClicked}
                callback={responseFacebook}
                size="medium"
                textButton="Registrarse con Facebook"
                icon="fa-facebook"
              />
            </HStack>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <label htmlFor="nombres">Nombres </label>
              <FormControl>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register('nombres', {
                    required: true,
                    message: 'campo obligatorio',
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
                  {...register('apellidos', { required: 'Campo Obligatorio' })}
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
                  {...register('email', { required: 'Campo Inválido' })}
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
                  {...register('celular', {
                    required: 'Campo Obligatorio',
                    maxLength: { value: 10, message: 'Máximo 10 digitos' },
                    minLength: {
                      value: 7,
                      message: 'Mínimo 7 digitos cuando es teléfono fijo',
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
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: { value: 6, message: 'Mínimo 6 digitos' },
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
                  {...register('password2', {
                    required: 'Confirme la Contraseña',
                    validate: {
                      coincidePswAnterior: value => {
                        const { password } = getValues();
                        return (
                          password === value ||
                          'Las contraseñas deben coincidir'
                        );
                      },
                    },
                    minLength: { value: 6, message: 'Mínimo 6 digitos' },
                  })}
                />
                <FormErrorMessage>
                  {errors.password2 && errors.password2.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            {isLoading && <Spinner />}
            <HStack mt={4} w={'100%'}>
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
      <AddressModal
        showModal={showModal}
        setshowModal={setshowModal}
        setDireccion={setDireccion}
      />
    </Flex>
  );
};
