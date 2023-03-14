import React, { useEffect, useRef, useState  } from "react";

import L from "leaflet";
import { city_data } from '../../helpers/data'
import { Box, Flex } from "@chakra-ui/react";
Modal.setAppElement(document.getElementById('root'));

export const Map = ({ cityData }) => {


  const mapRef = useRef(null)
  const tileRef = useRef(null)
  const controlRef = useRef(null)
  const layerRef = useRef(null)


  // Base tile for the map:
  tileRef.current = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const mapStyles = {
    overflow: "hidden",
    width: "50%",
    height: "70vh",
  };
  if (localStorage.getItem('lat')===null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sucess, error);
      console.log('calculara posicion');
    } else {
        alert("Geolocalización no disponible. Será redirigido para que suministre la dirección de su domicilio");
    }   
    function sucess (ubicacion) {
      const lng = ubicacion.coords.longitude;
      const lat = ubicacion.coords.latitude;
      localStorage.setItem("long",lng);
      localStorage.setItem("lat",lat); 
    }
    function error() {
      alert("Geolocalización no autorizada. Será redirigido para que suministre la dirección de su domicilio");
    }
  } else {
    //history.push('/listalocales')
  }
  // Options for our map instance:
  const mapParams = {
    center: [37.0902, -95.7129], // USA
    zoom: 5,
    zoomControl: false,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [tileRef.current] // Start with just the base layer
  };

  // Create a baseMaps object to be passed to the layerControl:
  const baseMaps = {
    
  };
  
  // Map creation:
  useEffect(() => {
    mapRef.current = L.map("mapid", mapParams);
  }, []);


  // Controls:
  useEffect(() => {
      // Add the base layer to the control:
      controlRef.current = L.control.layers({ 
        OpenStreetMap: tileRef.current 
      }).addTo(mapRef.current);
      
      // Add zoomControl:
      L.control.zoom({ 
        position: "topright" 
      }).addTo(mapRef.current);
  }, [])

  // Map events:
  useEffect(() => {
    mapRef.current.on("zoomstart", () => {
      console.log("ZOOM STARTED");
    });
  }, [])

  // Create the layerGroup:
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
    controlRef.current.addOverlay(layerRef.current, 'Circles')
  }, [])

  // Add the city circles to the map:
  useEffect(() => {
    layerRef.current.clearLayers()
    Array.from(city_data).forEach(city => {
      L.circle(city.latLng, { radius: 100000 }).addTo(
        layerRef.current
      );
    });
  }, [cityData])


  return (
    <Box ml="350px">

         <div id="mapid" style={mapStyles} />

     
    </Box>

  )
}

