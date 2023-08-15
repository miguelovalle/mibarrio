import { Container, IconButton } from "@chakra-ui/react";
import { SlMagnifier } from "react-icons/sl";
export const BtnSearch = () => {
  return (
    <Container>
      <a href="/searchtext">
        <input
          type="search"
          color="black "
          placeholder="Que quieres encontrar..."
        />
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<SlMagnifier />}
        />
      </a>
    </Container>
  );
};
