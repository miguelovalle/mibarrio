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
import { AddressModal } from "../address/AddressModal";
import { useUserDetail } from "../../hooks/loginHooks";

export const BtnAddress = ({ setCoords }) => {
  const btnRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showModal, setshowModal] = useState(false);

  const addressValue = localStorage.getItem("address");

  const [addrText, setaddrText] = useState(addressValue);

  const uid = localStorage.getItem("userId");

  const user = useUserDetail(uid);

  const addresses = user?.data?.userInf?.address;

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
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent background={"orange.100"}>
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
        id={user?.data?.userInf?._id}
        addresses={addresses}
      />
    </Box>
  );
};
