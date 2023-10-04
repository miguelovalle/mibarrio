import { useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  Box,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { AddressModal } from "../address/AddressModal";

export const BtnAddress = ({ setCoords }) => {
  //  let addressValue;

  const btnRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showModal, setshowModal] = useState(false);

  const addressValue = localStorage.getItem("address");

  const [addrText, setaddrText] = useState(addressValue);

  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["user"]);

  const addresses = userData?.userInf?.address;

  const handleInsert = () => {
    setshowModal(true);
  };

  const handleRadio = (value) => {
    const items = value.split(",");
    setaddrText(items[0]);
    localStorage.setItem("address", items[0]);
    localStorage.setItem(
      "coords",
      JSON.stringify({ lat: items[1], lng: items[2] })
    );

    setCoords({ lat: items[1], lng: items[2] });
  };

  return (
    <Box>
      <Wrap>
        <WrapItem>
          <Text> {addrText} </Text>
        </WrapItem>
        <WrapItem>
          <Button
            leftIcon={<BsFillCaretDownFill size={30} />}
            onClick={onOpen}
            colorScheme="blue"
            variant="ghost"
          />
        </WrapItem>
      </Wrap>

      <Drawer
        isOpen={isOpen}
        placement="right"
        idfullheight={false}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent background={"orange.200"}>
          <DrawerCloseButton />
          <DrawerHeader>Seleccione Una Dirección</DrawerHeader>

          <DrawerBody>
            <RadioGroup onChange={handleRadio}>
              {addresses?.map((item, index) => (
                <ul key={index}>
                  <Radio
                    value={[item.address, item.coords.lat, item.coords.lng]}
                  >
                    {item.address}
                    {"  "}
                    {item.siteName}
                  </Radio>
                </ul>
              ))}
            </RadioGroup>
            <Button color={"blue"} size={"sm"} onClick={handleInsert}>
              Registrar Nueva Dirección
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <AddressModal
        showModal={showModal}
        setshowModal={setshowModal}
        id={userData?.userInf?._id}
        addresses={addresses}
      />
    </Box>
  );
};
