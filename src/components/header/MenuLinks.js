import React, { useState } from 'react';
import { Button, Box, Stack, Link, Text } from '@chakra-ui/react';
import { AddressModal } from '../address/AddressModal';

export const MenuLinks = ({ isOpen }) => {
  
  const [showModal, setshowModal] = useState(false);

  const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
    return (
      <Link href={to}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    );
  };
  //const direccion = localStorage.getItem("direccion");

  const onOpen = () => {
    setshowModal(true);
  };

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={4}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Text
          as="button"
          onClick={onOpen}
          color={['blue.700']}
          bg={['white', 'white', 'primary.500', 'primary.500']}
          rounded="md"
        >
          {' '}
          Cambiar Dirección
        </Text>
        <MenuItem to="/login">Ingreso</MenuItem>
        <MenuItem to="/registro">Nuevo Usuario</MenuItem>
        <MenuItem to="//localhost:3500/auth/pag1" isLast>
          Nuevo Negocio
          <Button
            size="sm"
            rounded="md"
            color={['tomato']}
            bg={['white', 'white', 'primary.500', 'primary.500']}
            _hover={{
              bg: ['primary.700', 'primary.100', 'primary.600', 'primary.600'],
            }}
          >
            Buscar
          </Button>
        </MenuItem>
      </Stack>
      <AddressModal showModal={showModal} setshowModal={setshowModal} />
    </Box>
  );
};
