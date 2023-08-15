import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { Container, IconButton } from "@chakra-ui/react";
import { useSearch } from "../../hooks/productHooks";
import { ModalSearch } from "../product/ModalSearch";

export const SearchField = () => {
  const [searchState, setSearchState] = useState({ q: "" });
  const [showModal, setShowModal] = useState(false);
  const [hasQuery, setHasQuery] = useState(false);
  const { data, isError, isSuccess } = useSearch(searchState, hasQuery);
  let result;
  const { q } = searchState;
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasQuery(true);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const handleChange = (e) => {
    e.preventDefault();
    setSearchState({
      ...searchState,
      [e.target.name]: e.target.value,
    });
  };
  if (isSuccess) {
    if (data?.ok === true) {
      result = data?.products;
    }
  }

  return (
    <Container>
      <form autoComplete="on" onSubmit={handleSubmit}>
        <input
          type="search"
          color="black "
          name="q"
          value={q}
          onChange={handleChange}
          placeholder="Que quieres encontrar..."
        />
        <IconButton
          type="submit"
          colorScheme="blue"
          aria-label="Search database"
          icon={<SlMagnifier />}
        />
      </form>
      <ModalSearch isOpen={showModal} onClose={closeModal} result={result} />
    </Container>
  );
};
