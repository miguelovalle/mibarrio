import React, { useEffect, useState } from 'react';
import { HeaderBar } from '../header/HeaderBar';
import { Image, Text, Flex, VStack } from '@chakra-ui/react';
import { fetchSinToken } from '../../helpers/fetch';

export const ListaLocales = () => {
  const [negocios, setNegocios] = useState([]);
  const lg = localStorage.getItem('long');
  const lt = localStorage.getItem('lat');
  console.log(lg, lt);

  useEffect(() => {
    const obtenerLista = async () => {
      const resp = await fetchSinToken(
        `negocio/listanegocios?lg=${Number(lg)}&lt=${Number(lt)}`
      );
      const data = await resp.json();
      console.log(data);
      setNegocios(data.negocios);
    };
    obtenerLista();
  }, [lg, lt]);

  return (
    <Flex direction="column" w="full">
      <HeaderBar />
      <Flex wrap="wrap">
        {negocios.map(negocio => (
          <Flex
            justify="flex-start"
            w="400px"
            bg="orange.100"
            border="1px solid tomato.200"
            padding={5}
            m="0.5"
            key={negocio._id}
          >
            <Flex w="400px">
              <Image
                boxSize="100px"
                objectFit="cover"
                borderRadius="lg"
                src={negocio.imgName}
                alt={negocio.nombre}
              />
              <VStack w="300px">
                <Text fontSize="xl">{negocio.nombre}</Text>
                <Text fontSize="small">{negocio.especialidad}</Text>
                <Text fontSize="small">{negocio.cruce}</Text>
              </VStack>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
