import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { User } from "firebase/auth"
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal'
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? <Icons /> : <AuthButtons />}
                <UserMenu user={user} />
                {/* <Menu /> */}
            </Flex>
        </>
    )
}
export default RightContent;