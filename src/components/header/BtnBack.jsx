import { Button } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
export const BtnBack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hide =
    location.pathname === "/" || location.pathname === "/shops"
      ? "none"
      : "inline";

  return (
    <Button
      leftIcon={<MdArrowBackIosNew />}
      variant="ghost"
      colorScheme="white"
      size="lg"
      display={hide}
      onClick={() => navigate(-1)}
    />
  );
};
