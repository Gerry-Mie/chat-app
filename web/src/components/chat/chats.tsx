import { Badge, Box, Flex, Indicator, Title } from '@mantine/core';
import axios from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { chat_set_selected } from '../../store/slice/chat';
import ChatInterface from '../../types/chat-interface';
import useSocket from '../../hooks/use-socket';

interface State {
    error: boolean
    loading: boolean

    data: ChatInterface[]
}

const Chats = () => {

    const currentUser = useAppSelector(state => state.user.data!)
    const selectedContact = useAppSelector(state => state.chat.selected!)
    const [state, setState] = useState<State>({loading: true, error: false, data: []})
    const dispatch = useAppDispatch()
    const socket = useSocket()
    const fetchChats = () => {
        axios.get('/chats/' + currentUser._id).then(({data}) => {
            setState({loading: false, error: false, data})
        }).catch(() => {
            setState({loading: false, error: true, data: []})
        })
    }

    useEffect(() => {
        fetchChats()
        socket.on('update_chat', () => {
            fetchChats()
        })
        return () => {
            socket.off('update_chat')
        }
    }, []);

    const chat = (chat: any) => () => {
        const chatId = chat._id
        dispatch(
            chat_set_selected({
                userId: chat.user._id,
                chatId,
                name: chat.user.name
            })
        )
    }

    if (state.error) return <Title order={3} align="center">Error</Title>
    if (state.loading) return <Title order={3} align="center">loading</Title>

    return (
        <Box pt={10}>
            {
                state.data.map(data => (
                    <Flex
                        key={data._id}
                        p={8}
                        align="center"
                        sx={theme => ({
                            cursor: 'pointer',
                            backgroundColor: selectedContact?.chatId === data._id ? theme.colors.app[0] : '',
                            color: selectedContact?.chatId === data._id ? 'white' : 'black'
                        })}>
                        <Box
                            w="100%"
                            onClick={chat(data)}
                            key={data._id}
                        >
                            {data.user.name}
                        </Box>
                        {data.unread > 0 && <Badge color='red'>{data.unread}</Badge>}
                    </Flex>

                ))
            }
        </Box>
    );
}

export default Chats;
