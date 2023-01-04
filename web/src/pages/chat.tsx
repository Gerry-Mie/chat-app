import { Box, Button, Divider, Flex, Tabs, Title } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../store';
import Contacts from '../components/chat/contacts';
import axios from '../utils/axios';
import { set_user } from '../store/slice/user';
import { showNotification } from '@mantine/notifications';
import useSocket from '../hooks/use-socket';
import { useEffect } from 'react';
import ChatBox from '../components/chat/chat-box';
import Chats from '../components/chat/chats';

const Chat = () => {

    const user = useAppSelector(state => state.user.data!)
    const selectedContact = useAppSelector(state => state.chat.selected)
    const dispatch = useAppDispatch()
    const socket = useSocket()


    useEffect(() => {
        socket.emit('online', user._id)
    }, []);

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
        <Flex direction="column" h="100%">
            <Flex justify="space-between" p={10}>
                <Title order={3}>{user.name}</Title>
                <Button onClick={logout}>logout</Button>
            </Flex>
            <Divider/>

            <Flex h="100%">
                {/* chats and contacts */}
                <Box w={500} sx={{borderRight: '1px solid #CED4DA'}}>
                    <Tabs defaultValue="chats">
                        <Tabs.List>
                            <Tabs.Tab value="chats">Chats</Tabs.Tab>
                            <Tabs.Tab value="contacts">Contacts</Tabs.Tab>
                        </Tabs.List>
                        {/* chat list */}
                        <Tabs.Panel value="chats">
                            <Chats/>
                        </Tabs.Panel>
                        {/* contacts */}
                        <Tabs.Panel value="contacts">
                            <Contacts/>
                        </Tabs.Panel>
                    </Tabs>
                </Box>
                {/* chat box */}
                {selectedContact ? <ChatBox/> : <Box bg="#e9e9e9" w="100%"/>}
            </Flex>
        </Flex>
    );
}

export default Chat;
