import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useRecoilValue } from "recoil";
import { authModalState } from '@/atoms/authModalAtom';
import Login from './Login';
import Signup from './Signup';


//Shows login or signup input fleids according of clicked button
//Due to length and complexity, login and signup forms and design are in separate files.
type AuthInputsProps = {

};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState)
    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
            {modalState.view === 'login' && <Login />}
            {modalState.view === 'signup' && <Signup />}
        </Flex>
    )
}
export default AuthInputs;