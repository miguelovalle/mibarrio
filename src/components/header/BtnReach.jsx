import { Box, Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

export const BtnReach = ({ setReach }) => {
  return (
    <Wrap>
      <WrapItem>
        <Button size={"xs"} onClick={() => setReach(true)}>
          Ver Todos
        </Button>
      </WrapItem>
      <WrapItem>
        <Button size={"xs"} onClick={() => setReach(false)}>
          Solo el Barrio
        </Button>
      </WrapItem>
    </Wrap>
  );
};
