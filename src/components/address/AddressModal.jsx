import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { geolocation } from "../../components/helpers/geolocation";
import Gmap from "../GoogleMap/Gmap";
import { useMutateAddAddress } from "../../hooks/loginHooks";

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  Input,
  ModalBody,
  Button,
  Box,
  VStack,
  Select,
  Grid,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormErrorMessage,
  ModalContent,
} from "@chakra-ui/react";

export const AddressModal = ({ showModal, setshowModal, id, addresses }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showMap, setshowMap] = useState(false);
  const [pinCenter, setpinCenter] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const result = useMutateAddAddress();

  const onSubmit = async (data) => {
    const direccion = data.detalles
      ? `${data.principal} ${data.cruceA} ${data.cruceB} ${data.puerta} ${data.detalles}`
      : `${data.principal} ${data.cruceA} ${data.cruceB} ${data.puerta}`;

    const placeName = `${data.principal} ${data.cruceA} ${data.cruceB} ${data.puerta} Bogota, co`;

    await geolocation(placeName).then((position) => {
      setpinCenter({
        lat: Number(position?.lat),
        lng: Number(position?.lng),
      });
      localStorage.setItem(
        "coords",
        JSON.stringify({
          lat: Number(position?.lat),
          lng: Number(position?.lng),
        })
      );
    });

    if (!!addresses) {
      const addressNew = {
        city: "Bogota",
        address: direccion,
        coords: JSON.parse(localStorage.getItem("coords")),
        siteName: data.siteName,
      };

      const addressArray = [addressNew, ...addresses];
      result.mutate(
        { id: id, address: addressArray },
        {
          onError: (error) => {
            console.log("el error", error);
          },
        }
      );
    }
    localStorage.setItem("address", direccion);

    setshowMap(true);
    setDisabledBtn(false);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  return (
    <Box w={[300, 400, 500]}>
      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            as="h3"
            size="md"
            bg="orange.400"
            w="100%"
            p={4}
            color="white"
            textAlign="pinCenter"
            borderRadius="lg"
          >
            Direccion de Entrega
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack mt={8} spacing={6}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
                  <Select {...register("principal")}>
                    <option value="calle">Calle</option>
                    <option value="carrera">Carrera</option>
                    <option value="avenida">Avenida</option>
                    <option value="diagonal">Diagonal</option>
                    <option value="transversal">Transversal</option>
                  </Select>

                  <FormControl isInvalid={errors.cruceA}>
                    <Input
                      type="text"
                      borderColor="gray.300"
                      {...register("cruceA", {
                        required: "# Cra o Calle requerido",
                        maxLength: {
                          value: 15,
                          message: "máximo 15 caracteres",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.cruceA && errors.cruceA.message}
                    </FormErrorMessage>
                  </FormControl>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
                  <InputGroup>
                    <InputLeftAddon children="#" />
                    <FormControl isInvalid={errors.cruceB}>
                      <Input
                        borderColor="gray.300"
                        type="text"
                        {...register("cruceB", {
                          required: "# Cra o Calle requerido",
                          maxLength: {
                            value: 15,
                            message: "máximo 15 caracteres",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.cruceB && errors.cruceB.message}
                      </FormErrorMessage>
                    </FormControl>
                  </InputGroup>

                  <FormControl isInvalid={errors.puerta}>
                    <Input
                      borderColor="gray.300"
                      type="text"
                      {...register("puerta", {
                        required: "# puerta requerido",
                        maxLength: {
                          value: 15,
                          message: "máximo 15 caracteres",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.puerta && errors.puerta.message}
                    </FormErrorMessage>
                  </FormControl>
                </Grid>

                <Input
                  borderColor="gray.300"
                  type="text"
                  placeholder="Torre ? Apto ???"
                  {...register("detalles")}
                />
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nombre del Sitio. Ej: casa u oficina o mamá"
                    borderColor="gray.400"
                    {...register("siteName")}
                  />
                  <FormErrorMessage>
                    {errors.siteName && errors.siteName.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
                <Button
                  colorScheme="blue"
                  isDisabled={disabledBtn}
                  onClick={closeModal}
                >
                  Regresar
                </Button>
                <Button type="submit" colorScheme="blue">
                  Ubicar
                </Button>
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {
        <Gmap
          pinCenter={pinCenter}
          setpinCenter={setpinCenter}
          showMap={showMap}
          setshowMap={setshowMap}
        />
      }
    </Box>
  );
};
