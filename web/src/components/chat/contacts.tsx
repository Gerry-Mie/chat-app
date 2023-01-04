import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Box, createStyles, Title } from '@mantine/core';
import UserInterface from '../../types/user-interface';
import { useAppDispatch, useAppSelector } from '../../store';
import { chat_set_selected } from '../../store/slice/chat';

interface State {
    error: boolean
    loading: boolean

    data: UserInterface[]
}

const useStyle = createStyles(theme=>({
    user: {
        padding: 5,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.colors.app[0],
            color: 'white'
        }
    }
}))

const Contacts = () => {

    const currentUser = useAppSelector(state => state.user.data!)
    const selectedContact = useAppSelector(state => state.chat.selected)
    const [state, setState] = useState<State>({error: false, loading: true, data: []})
    const {classes} = useStyle()
    const dispatch = useAppDispatch()

    useEffect(() => {
        axios.get('/users')
            .then(({data}) => setState({error: false, loading: false, data}))
            .catch(() => setState({error: true, loading: false, data: []}))
    }, [])

    const chat = (user: UserInterface) => () => {
        const chatId = [user._id, currentUser._id].sort().toString()
        dispatch(
            chat_set_selected({
                userId: user._id,
                chatId,
                name: user.name
            })
        )
    }


    if (state.loading) return <Title align="center" order={3}>loading...</Title>
    if (state.error) return <Title align="center" order={3}>error :(</Title>
    return (
        <Box pt={10}>
            {
                state.data.map(user => (
                    <Box
                        className={classes.user}
                        sx={theme => ({
                            backgroundColor: selectedContact?.userId===user._id?theme.colors.app[0]:'',
                            color: selectedContact?.userId===user._id?'white':'black'
                        })}
                        key={user._id}
                        onClick={chat(user)}>
                        <Title order={4}>{user.name}</Title>
                    </Box>
                ))
            }
        </Box>
    );
}

export default Contacts;
