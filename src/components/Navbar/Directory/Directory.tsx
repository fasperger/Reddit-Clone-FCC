import React from 'react';
import { Icon, Flex, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TiHome } from 'react-icons/ti';


const Directory: React.FC = () => {

    return (
        <Menu>
            <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>

                <Flex align="center">
                    <Flex align="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                    </Flex>
                    <Flex display={{ base: "none", lg: "flex" }}>
                        <Text fontWeight={600}>Home</Text>
                    </Flex>
                    <ChevronDownIcon color="gray.300" />
                </Flex>
            </MenuButton>

            <MenuList>
                {/* <Communities /> */}
            </MenuList>
        </Menu>
    )
}
export default Directory;