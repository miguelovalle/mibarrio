import { useEffect, useState } from "react";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BtnBack } from "../header/BtnBack";
import { BtnAddress } from "../header/BtnAddress";
import { BtnSearch } from "./BtnSearch";
//import { useUserDetail } from "../../hooks/loginHooks";

//import { BtnReach } from "../header/BtnReach";

export const HeaderBar = () => {
  const coord = JSON.parse(localStorage.getItem("coords"));

  const [coords, setCoords] = useState(coord);

  const [reach, setReach] = useState(false);

  const query = { coords, setCoords, reach, setReach };
  

  const navigate = useNavigate();

  useEffect(() => {
    coords == null && navigate("/landing");
  }, [coords]);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        w={["30rem", "48rem", "62rem", "80rem", "100%"]}
        my={12}
        p={8}
        bg="orange.400"
        color={"blue.600"}
      >
        <BtnBack />
        <BtnAddress setCoords={setCoords} />
        <Box as="nav">
          <HStack display={{ base: "none", md: "flow" }}>
            <Link to={"/login"}>ingresar</Link>
            <Link to={"/registro"}>Actualiza Perfil</Link>
          </HStack>
        </Box>

        <BtnSearch />
      </Flex>

      <Outlet context={query} />
    </>
  );
};
