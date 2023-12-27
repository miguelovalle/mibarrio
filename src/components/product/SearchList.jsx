import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearch } from "../../hooks/productHooks";
import { SlMagnifier } from "react-icons/sl";
import { ModalProduct } from "./ModalProduct";
import { IoIosCart } from "react-icons/io";
import { numberFormat } from "../../components/helpers/numberFormat";
import { DialogLogin } from "./DialogLogin";
import { useNavigate } from "react-router-dom";
import { BtnBack } from "../header/BtnBack";

export const SearchList = () => {
  const [searchState, setSearchState] = useState({ q: "" });
  const [showModal, setShowModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [showTotal, setshowTotal] = useState("none");
  const [showDialog, setShowDialog] = useState(false);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  const { data, isError, isSuccess, isLoading } = useSearch(searchState);

  let result;

  const { q } = searchState;

  const closeModal = () => setShowModal(false);

  const closeDialog = () => setShowDialog(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchState({
      ...searchState,
      [e.target.name]: e.target.value,
    });
  };


  isSuccess && data?.ok === true ? (result = data?.products) : (result = []);

  const showProduct = () => {
    setShowModal(true);
  };

  const handleOrder = () => {
    sessionStorage.setItem("order", JSON.stringify(orderList));
    const userid = localStorage.getItem("id");
    userid ? navigate("/order") : setShowDialog(true);
  };

  return (
    <Box bg={"gray.200"} minW={470} h={"100vh"}>
      <VStack mt={4}>
        <HStack>
          <BtnBack />
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <SlMagnifier />
            </InputRightElement>
            <Input
              type="search"
              size={"md"}
              color="black "
              name="q"
              my={2}
              value={q}
              onChange={handleChange}
              variant={"filled"}
              placeholder="Que quieres encontrar..."
            />
          </InputGroup>
        </HStack>

        {isLoading && <Spinner />}

        {result?.map((item) => (
          <Box w={480} key={item._id} mt={4}>
            <a
              href="#"
              onClick={() => {
                setProduct(item);
                setShowModal(true);
              }}
            >
              <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
                my={4}
                w={450}
              >
                <Text>{item.name}</Text>
                <IconButton
                  onClick={showProduct}
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<SlMagnifier />}
                />
              </Flex>
            </a>
            <Button
              display={showTotal}
              leftIcon={<IoIosCart />}
              onClick={() => handleOrder()}
            >
              {`Lanzar Pedido por ${numberFormat(subTotal)}`}
            </Button>
          </Box>
        ))}
        <DialogLogin isOpen={showDialog} onClose={closeDialog} />
        <ModalProduct
          product={product}
          isOpen={showModal}
          onClose={closeModal}
          orderList={orderList}
          setOrderList={setOrderList}
          setSubTotal={setSubTotal}
          setshowTotal={setshowTotal}
        />
      </VStack>
    </Box>
  );
};
