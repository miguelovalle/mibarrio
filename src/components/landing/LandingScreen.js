import { Box, Heading, Button, Flex, VStack, Alert, AlertIcon, AlertDescription,} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiMapPin } from "react-icons/bi";
import { PageHeader } from '../comercio/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../../hooks/loginHooks';

export const LandingScreen = () => {
    const [showAlert, setshowAlert] = useState( {show: false, message: ""} );
    const navigate = useNavigate();
    const [position] = useGeolocation()
    
    const getCoord= () => { 
        if (position) {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            localStorage.setItem("long",lng);
            localStorage.setItem("lat",lat);
            position && navigate('/')
        } else {
            setshowAlert({show: true, message: "Se bloqueó captura de Posición. Regístrese como nuevo usuario"});
        }
    };
    
    return (
        <Box >
            <Flex direction="column" align="center">
                <PageHeader pageTitle={'Bienvenido'} />
                <Heading as="h2" size="xl" color="orange.400" mt="14" p="4" >
                    En su Barrio Hay !!
                </Heading>

                <Heading as="h4" size="md" color="orange.600" >
                    Productos y Servicios a un Click
                </Heading>

                <Heading as="h4" size="md" color="orange.600" mt="24">
                    Explorar comercio usando:
                </Heading>
                <VStack>
                    { showAlert.show 
                        ? 
                            <Alert status='warning'>
                                <AlertIcon />
                                <AlertDescription>{ showAlert.message }</AlertDescription>
                            </Alert>
                        : <></>     
                    }
                    <Button 
                        leftIcon={<BiMapPin />} 
                        iconSpacing= {6} 
                        colorScheme="blue" w="sm" p="6" mt="4" 
                        onClick={getCoord}> Ubicación
                    </Button>
    
                    <Button as="a"   
                        colorScheme="blue"
                        w="sm" p="6" mt="4"  
                        href="/registro">
                    Registrar Nuevo Ususario
                    </Button>                
                </VStack>
            </Flex>

        </Box>
    )
}
