import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BtnBack } from "../header/BtnBack";
import { BtnAddress } from "../header/BtnAddress";
import { BtnSearch } from "./BtnSearch";
import { useUserDetail } from "../../hooks/loginHooks";
import { FiShoppingBag } from "react-icons/fi";
import { Categories } from "../comercio/Categories";
import { BtnReach } from "../header/BtnReach";
export const HeaderBar = () => {
  const [category, setCategory] = useState("Restaurantes");

  const coord = JSON.parse(localStorage.getItem("coords"));

  const [coords, setCoords] = useState(coord);

  const [reach, setReach] = useState(false);

  const query = { category, setCategory, coords, setCoords, reach, setReach };

  const uid = localStorage.getItem("id");

  const id = uid ? uid : "";

  const navigate = useNavigate();

  const result = useUserDetail(id);

  !coords && navigate("/landing");

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg="orange.400"
        color={"black"}
      >
        <BtnBack />
        <BtnAddress setCoords={setCoords} />
        <BtnReach setReach={setReach} />
        <BtnSearch />
        <Link to={"/login"}>ingresar</Link>
        <Link to={"/registro"}>Actualiza Perfil</Link>
        <FiShoppingBag size={30} />
      </Flex>
      <Categories setCategory={setCategory} />

      <Outlet context={query} />
    </Box>
  );
};
