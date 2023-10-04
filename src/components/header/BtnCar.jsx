import { Button } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const BtnCar = () => {
  const navigate = useNavigate();
  return (
    <Button
      leftIcon={<FiShoppingBag />}
      variant="ghost"
      colorScheme="white"
      size="lg"
      onClick={() => navigate("/order")}
    />
  );
};
