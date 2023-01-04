import { AppShell } from '@mantine/core';
import { useAppSelector } from '../store';
import { useEffect } from 'react';
import ChatBox from '../components/chat/chat-box';
import useSocket from '../hooks/use-socket';
import Header from '../components/chat/header';
import Navbar from '../components/chat/navbar';

const Chat = () => {

    const user = useAppSelector(state => state.user.data!)
    const selectedContact = useAppSelector(state => state.chat.selected)

    const socket = useSocket()


    useEffect(() => {
        socket.emit('online', user._id)
    }, []);

    return (
        <AppShell
            padding={0}
            header={<Header/>}
            navbar={<Navbar/>}

            styles={() => ({
                main: { backgroundColor: '#e9e9e9', position: 'relative' },
            })}
        >
                {/* chat box */}
                {selectedContact  && <ChatBox/>}
        </AppShell>
    );
}

export default Chat;
