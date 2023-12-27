import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
//import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

//import { BsMenuUp } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
export const BtnBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let bk, mn;

  if (location.pathname === "/" || location.pathname === "/shops") {
    bk = "none";
    mn = "inline";
  } else {
    bk = "inline";
    mn = "none";
  }

  return (
    <>
      <Button
        leftIcon={<IoMdArrowRoundBack />}
        variant="ghost"
        colorScheme="blue"
        size="lg"
        display={bk}
        onClick={() => navigate(-1)}
      />

      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<IoMenu />}
          colorScheme="blue"
          size="md"
          variant={"solid"}
          display={mn}
        />
        <MenuList>
          <MenuItem onClick={() => navigate("/login")}>
            Registrarme. Soy nuevo
          </MenuItem>
          <MenuItem onClick={() => navigate("/registro")}>
            Actulizar mis datos{" "}
          </MenuItem>
          <MenuItem>Registra tu negocio</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
