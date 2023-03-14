import React from 'react'
import { Flex, Center, Box, HStack, VStack, Text} from "@chakra-ui/react";
import Logo from '../header/Logo';

export const PageHeader = ( { pageName, pageTitle } ) => {
    return (
        <Flex  w={[360,400,500]} mb={2} p={2}>
            <Center w="100%">
                <Box bg="orange.400" w="100%" mb={2} p={2} color="white">
                    <HStack w="100%">
                        <Logo />
                        <VStack>
                            <Text mt="2" fontSize={["18px", "22px", "28px"]} align="center"> { pageTitle } </Text>
                            <Text fontSize={["12px", "14px", "18px"]} align="center" > {pageName} </Text>                           
                        </VStack>
                      
                    </HStack>

                </Box>
            </Center>
        </Flex>
    )
}
