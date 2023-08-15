import { useState } from "react";
import { useSearch } from "../../hooks/productHooks";
import {
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
    <Container>
      <BtnBack />
      <input
        type="search"
        color="black "
        name="q"
        value={q}
        onChange={handleChange}
        placeholder="Que quieres encontrar..."
      />
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<SlMagnifier />}
      />
      <Flex direction={"column"} mt={6}>
        {isLoading && <Spinner />}
        {result?.map((item) => (
          <HStack key={item._id}>
            <a
              href="#"
              onClick={() => {
                setProduct(item);
                setShowModal(true);
              }}
            >
              <Text>{item.name}</Text>
              <IconButton
                onClick={showProduct}
                colorScheme="blue"
                aria-label="Search database"
                icon={<SlMagnifier />}
              />
            </a>{" "}
            <Button
              display={showTotal}
              leftIcon={<IoIosCart />}
              onClick={() => handleOrder()}
            >
              {`Lanzar Pedido por ${numberFormat(subTotal)}`}
            </Button>
          </HStack>
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
      </Flex>
    </Container>
  );
};
