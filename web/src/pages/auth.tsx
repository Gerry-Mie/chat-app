import Login from '../components/auth/login';
import Signup from '../components/auth/signup';
import { Flex } from '@mantine/core';

const Auth = () => {
    return (
        <Flex justify='center' gap={30} pt={120}>
            <Login/>
            <Signup/>
        </Flex>
    );
}

export default Auth;
