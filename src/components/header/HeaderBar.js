import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Logo from './Logo';
import { MenuToggle } from './MenuToggle';
import { MenuLinks } from './MenuLinks';
import { Outlet, useNavigate } from 'react-router-dom';

export const HeaderBar = (saludo, visible = false) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const direccion = localStorage.getItem('direccion');
    const lng = localStorage.getItem('long');
    if (direccion == null && lng === null) {
      navigate('/landing');
    }
  }, [navigate]);
  //dispatch( direccionNew({direccion}) );

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg="orange.400"
        color={['white']}
      >
        <Logo />
        <MenuToggle isOpen={isOpen} toggle={toggle} />
        <Text hidden="visible">saludo </Text>
        <MenuLinks isOpen={isOpen} />
      </Flex>
      <Outlet />
    </Box>
  );
};
