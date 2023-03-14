import React, { memo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Modal, ModalOverlay, ModalContent, ModalBody, Button, useToast, Spinner,} from "@chakra-ui/react"

const containerStyle = {
  width: '600px',
  height: '600px'
};

const Gmap = ( { center, setcenter, showMap, setshowMap }) =>  {
  const [map, setMap] = useState( null );
  const toast= useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_KEY
  })

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);
 
  const  HandleConfirm = () => {
    toast({
      description: "La dirección que confirmó, ha sido registrada",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })    
  };
  
  const handleDragEnd = (coord) => {
    console.log("por arrastrar")
    setcenter({lat: coord.latLng.lat, lng: coord.latLng.lng})
  };

  const closeMap= () => {
    setshowMap(false);
  }

  if (loadError) {
    return (
      toast({
        description: "No se pudo cargar el mapa",
        status: 'warning',
        duration: 59000,
        isClosable: true,
      })  
    )
  } 

  return isLoaded ? (
      <Modal isOpen={ showMap } onClose={ closeMap }>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
            <Button 
              mt="450px" 
              ml="420px" 
              colorScheme= "blue"
              size="lg"  
              onClick={ HandleConfirm }>
              Confirmar
            </Button >
            
            <Marker 
              position={center} 
              draggable={true}
              onDragEnd={handleDragEnd}
            />
            </GoogleMap>
          </ModalBody>
        </ModalContent> 
      </Modal>
  ) : <Spinner />
}
export default memo( Gmap )
