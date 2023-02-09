import React from 'react';
import { Flex, Image } from '@chakra-ui/react'
import SearchInput from './SearchInput';
import RightContent from '../Navbar/RightContent/RightContent'

const Navbar: React.FC = () => {

    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src="/images/redditFace.svg" alt="reddit face" height="30px" />
                <Image src="/images/redditText.svg" alt="reddit text" height="46px" display={{ base: "none", md: "unset" }} />
            </Flex>
            <SearchInput />
            {/* <Directory /> */}
            <RightContent />
        </Flex>
    )
}
export default Navbar;