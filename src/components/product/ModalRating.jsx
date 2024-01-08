import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Flex,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useMutateRateApp, useMutateRateService } from "../../hooks/orderHooks";

export const ModalRating = ({ commerceId, showModal, setshowModal }) => {
  const userId = localStorage.getItem("userId");
  const [showSend, setshowSend] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      rateService: null,
      rateApp: null,
      commentService: null,
      commentApp: null,
    },
  });

  const resultService = useMutateRateService(commerceId, userId);
  const resultApp = useMutateRateApp(commerceId, userId);
  const onSubmit = async (data) => {
    console.log("data", data);
    const objService = {
      userId: userId,
      commerceId: commerceId,
      dateRate: new Date(),
      rate: data.rateService,
      comment: data.commentService,
    };
    resultService.mutate(objService);

    const objApp = {
      userId: userId,
      dateRate: new Date(),
      rate: data.rateApp,
      comment: data.commentApp,
    };
    resultApp.mutate(objApp);
  };
  resultApp.isSuccess && console.log(resultApp.data);
  const onClose = () => {
    console.log("cerrar el modal");
    localStorage.removeItem("dateOrder");
    setshowModal(false);
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ayudanos a Mejorar</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody backgroundColor={"green.50"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <HStack justifyContent={"space-between"} align={"flex-start"}>
                <label ml={4}>Califica el Servicio de 1 a 5</label>
                <Spacer />
                <NumberInput w={16} size={"xs"} min={1} max={5} ml={4}>
                  <NumberInputField
                    {...register("rateService")}
                    onChange={() => console.log("algo")}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
              <Flex justifyContent={"space-between"} align={"flex-start"}>
                <label ml={4}>Califica la Aplicacion de 1 a 5</label>
                <Spacer />
                <NumberInput w={16} size={"sm"} min={1} max={5} ml={4}>
                  <NumberInputField
                    {...register("rateApp")}
                    onClick={() => console.log("algo")}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>

              <textarea
                rows={4}
                cols={30}
                placeholder="Deje aqui sus comentarios sobre el servicio"
                {...register("commentService")}
              />
              <textarea
                rows={4}
                cols={30}
                placeholder="Sus comentarios acerca de la aplicacion"
                {...register("commentApp")}
              />
              <Button
                type="submit"
                colorScheme="blue"
                isDisabled={!isDirty || !isValid}
              >
                Enviar
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
