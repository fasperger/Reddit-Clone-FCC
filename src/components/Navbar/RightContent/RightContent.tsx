import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal'
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';

type RightContentProps = {
    user: any;
};

const RightContent: React.FC<RightContentProps> = (props) => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {props.user ? <Button height="28px"
                    display={{ base: "none", sm: "flex" }}
                    width={{ base: "70px", md: "110px" }}
                    mr={2} onClick={() => signOut(auth)}>Logout</Button> : <AuthButtons />}
            </Flex>
        </>
    )
}
export default RightContent;