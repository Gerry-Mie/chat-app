import { Button, Flex, Title, Header as MHeader } from '@mantine/core';
import axios from '../../utils/axios';
import { set_user } from '../../store/slice/user';
import { showNotification } from '@mantine/notifications';
import { useAppDispatch, useAppSelector } from '../../store';

const Header = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.data?.name)
    const logout = () => {
        axios.post('/logout')
            .then(() => dispatch(set_user(null)))
            .catch(() => showNotification({
                title: 'Error',
                message: 'Something went wrong',
                color: 'red'
            }))
    }
    return (
        <MHeader height={60}>
            <Flex justify="space-between" h={60} align='center' px={20}>
                <Title order={3}>{user}</Title>
                <Button onClick={logout}>logout</Button>
            </Flex>
        </MHeader>
    );
}

export default Header;
