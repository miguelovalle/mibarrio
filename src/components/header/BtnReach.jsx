import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export const BtnReach = ({ setReach }) => {
  return (
    <Flex>
      <Button size={"xs"} onClick={() => setReach(true)}>
        Todos
      </Button>
      <Button size={"xs"} onClick={() => setReach(false)}>
        Barrio
      </Button>
    </Flex>
  );
};
