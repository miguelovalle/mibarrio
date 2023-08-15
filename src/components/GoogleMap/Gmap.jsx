import React, { memo, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";

const containerStyle = {
  width: "600px",
  height: "600px",
};

const Gmap = ({ pinCenter, setpinCenter, showMap, setshowMap }) => {
  const [map, setMap] = useState(null);
  const toast = useToast();
  const [disbl, setDisbl] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const HandleConfirm = () => {
    toast({
      description: "Las coordenadas de la direccion han sido confirmadas",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setDisbl(!disbl);
  };

  const handleDragEnd = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const newPosition = { lat, lng };
    setpinCenter(newPosition);
    localStorage.setItem("coords", JSON.stringify(pinCenter));
  };

  const closeMap = () => {
    setshowMap(false);
  };

  if (loadError) {
    return toast({
      description: "No se pudo cargar el mapa",
      status: "warning",
      duration: 59000,
      isClosable: true,
    });
  }

  return isLoaded ? (
    <Modal isOpen={showMap} onClose={closeMap}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={pinCenter}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Button
              mt="450px"
              ml="420px"
              colorScheme="blue"
              size="lg"
              disabled={disbl}
              onClick={HandleConfirm}
            >
              Confirmar
            </Button>

            <Marker
              position={pinCenter}
              map={map}
              draggable={true}
              onDragEnd={handleDragEnd}
            />
          </GoogleMap>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : (
    <Spinner />
  );
};
export default memo(Gmap);
