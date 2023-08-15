import React from "react";
import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
} from "@chakra-ui/react";
import { SlMagnifier } from "react-icons/sl";

export const ModalSearch = ({ result, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Resultados</ModalHeader>
        <ModalBody>
          <Flex direction={"column"} mt={6}>
            {result?.map((item) => (
              <HStack key={item._id}>
                <Text>{item.name}</Text>
                <IconButton
                  type="submit"
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<SlMagnifier />}
                />
              </HStack>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
