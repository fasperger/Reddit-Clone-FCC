import React from 'react';
import { Icon, Flex, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { signOut, User } from "firebase/auth"
import { MdOutlineLogin } from "react-icons/md"
import { auth } from '@/firebase/clientApp';

type UserMenuProps = {
    user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

    return (
        <Menu>
            <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>

                <Flex align="center">
                    <Flex align="center">
                        {user ? (
                            <>
                                <Icon as={FaRedditSquare} fontSize={24} mr={1} color="gray.300" />
                            </>

                        ) : (<Icon as={VscAccount} fontSize={24} mr={1} color="gray.400" />)}

                    </Flex>
                    <ChevronDownIcon color="gray.300" />
                </Flex>
            </MenuButton>

            <MenuList>
                <MenuItem fontSize='10pt' fontWeight={700} _hover={{ bg: "blue.500", color: "white" }}>
                    <Flex align="center">
                        <Icon as={CgProfile} mr={2} fontSize={20} /> Profile
                    </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem fontSize='10pt' fontWeight={700} _hover={{ bg: "blue.500", color: "white" }} onClick={() => signOut(auth)}>
                    <Flex align="center">
                        <Icon as={MdOutlineLogin} mr={2} fontSize={20} /> Log Out
                    </Flex>
                </MenuItem>

            </MenuList>
        </Menu>
    )
}
export default UserMenu;