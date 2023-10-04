import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { SlMagnifier } from "react-icons/sl";
import { BtnCar } from "./BtnCar";

export const BtnSearch = () => {
  return (
    <Flex align={"center"}>
      <a href="/searchtext">
        <InputGroup>
          <InputRightElement pointerEvents="none">
            <SlMagnifier />
          </InputRightElement>
          <Input
            type="search"
            size={"md"}
            color="black "
            variant={"filled"}
            placeholder="Que quieres encontrar..."
          />
        </InputGroup>
      </a>
      <BtnCar />
    </Flex>
  );
};
