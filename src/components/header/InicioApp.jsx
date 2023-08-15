import React from 'react'
import {Box, Image } from '@chakra-ui/react'
import logoApp from '../images/logoMiBarrio.png'

export const InicioApp = () => {
    return (
      <Box>
          <Image 
            src= { logoApp } 
            alt = "logo de App"
          />  
      </Box>

    )
}
