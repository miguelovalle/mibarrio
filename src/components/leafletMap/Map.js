import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { city_data } from '../../helpers/data';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Box,
} from '@chakra-ui/react';

export const Map = ({ cityData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const controlRef = useRef(null);
  const layerRef = useRef(null);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  const mapStyles = {
    overflow: 'hidden',
    width: '50%',
    height: '70vh',
  };

  // Options for our map instance:
  const mapParams = {
    center: [37.0902, -95.7129], // USA
    zoom: 5,
    zoomControl: false,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [tileRef.current], // Start with just the base layer
  };

  const Confirm = () => {
    //guardar en LS
  };

  // Map creation:
  useEffect(() => {
    mapRef.current = L.map('mapid', mapParams);
  }, []);

  // Controls:
  useEffect(() => {
    // Add the base layer to the control:
    controlRef.current = L.control
      .layers({
        OpenStreetMap: tileRef.current,
      })
      .addTo(mapRef.current);

    // Add zoomControl:
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(mapRef.current);
  }, []);

  // Map events:
  useEffect(() => {
    mapRef.current.on('zoomstart', () => {
      console.log('ZOOM STARTED');
    });
  }, []);

  // Create the layerGroup:
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
    controlRef.current.addOverlay(layerRef.current, 'Circles');
  }, []);

  // Add the city circles to the map:
  useEffect(() => {
    layerRef.current.clearLayers();
    Array.from(city_data).forEach(city => {
      L.circle(city.latLng, { radius: 100000 }).addTo(layerRef.current);
    });
  }, [cityData]);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            as="h3"
            size="md"
            bg="orange.400"
            w="100%"
            p={4}
            color="white"
            textAlign="center"
            borderRadius="lg"
          >
            Donde entregaremos lo pedido
          </ModalHeader>
          <ModalBody>
            <Box id="mapid" style={mapStyles}></Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Regresar
            </Button>
            <Button variant="ghost" onClick={Confirm}>
              Confirma Ubicación
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
