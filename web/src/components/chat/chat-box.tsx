import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { Box, Button, createStyles, Flex, Menu, Modal, Paper, ScrollArea, TextInput, Title } from '@mantine/core';
import useSocket from '../../hooks/use-socket';
import MessageInterface from '../../types/message-interface';
import { showNotification } from '@mantine/notifications';
import useMessages from '../../hooks/use-messages';

const useStyle = createStyles((theme) => ({
    myMessage: {
        justifyContent: 'right',


        '.message-wrap': {
            backgroundColor: theme.colors.app[0],
            padding: 10
        },
        'button': {
            border: 'none'
        }
    },

    message: {
        justifyContent: 'left',
        '.message-wrap': {
            backgroundColor: '#fff',
            padding: 10
        }
    }

}))

const ChatBox = () => {

    const currentUser = useAppSelector(state => state.user.data!)
    const selectedContact = useAppSelector(state => state.chat.selected!)
    const messages = useMessages()
    const socket = useSocket()
    const {classes} = useStyle()
    const [message, setMassage] = useState('')
    const [editMessage, setEditMessage] = useState<MessageInterface | null>(null)
    const [chatId, setChatId] = useState<string | null>(null)

    const sendMessage = () => {
        if (message.trim().length === 0) return;
        const data: MessageInterface = {
            usersId: selectedContact.chatId.split(','),
            messageId: selectedContact.chatId,
            content: message,
            from: currentUser._id,
            to: selectedContact.userId,
            createAt: new Date(),
            seen: false
        }
        socket.emit('message', data, (res: MessageInterface | null) => {
            if (!res) {
                return showNotification({
                    title: 'Error',
                    message: 'failed to send',
                    color: 'red'

                })
            }
            showNotification({
                title: 'Success',
                message: 'message sent',
                color: 'green'

            })
        })
        setMassage('')
    }

    useEffect(() => {
        if (chatId) socket.emit('leave_chat', chatId)
        socket.emit('join_chat', selectedContact.chatId)
        setChatId(selectedContact.chatId)
        socket.emit('message_seen', currentUser._id, selectedContact.chatId)
    }, [selectedContact]);

    useEffect(() => {
        const newMessageListener = (data: MessageInterface) => {
            messages.push(data)
            if (data.to === currentUser._id) {
                socket.emit('message_seen', currentUser._id, selectedContact.chatId)
            }
        }
        socket.on('new_message', newMessageListener)

        const removeMessageListener = (data: MessageInterface) => messages.remove(data._id!)
        socket.on('message_removed', removeMessageListener)
        const updateMessageListener = (data: MessageInterface) => messages.update(data)
        socket.on('message_updated', updateMessageListener)

        return () => {
            socket.off('new_message', newMessageListener)
            socket.off('message_removed', removeMessageListener)
            socket.off('message_updated', updateMessageListener)
        }

    }, []);

    const deleteMessage = (msg: MessageInterface) => () => {
        socket.emit('delete_message', msg, () => {
            showNotification({
                title: 'Error',
                message: 'Failed to Delete message',
                color: 'red'
            })
        })
    }

    const updateMessage = () => {
        socket.emit('update_message', editMessage, (res: any) => {
            if (!res) {
                return showNotification({
                    title: 'Error',
                    message: 'Failed to edit message',
                    color: 'red'
                })
            }
            setEditMessage(null)
        })
    }

    if (messages.loading) return <Title mt={10} align="center" order={3}>loading...</Title>
    if (messages.error) return <Title mt={10} align="center" order={3}>Error...</Title>


    return (
        <Flex w="100%" bg="#e9e9e9" direction="column">
            <Paper radius={0} p={10}>
                <Title order={5}>{selectedContact.name}</Title>
            </Paper>

            <Modal
                opened={!!editMessage}
                title="Edit"
                onClose={() => setEditMessage(null)}
                closeOnClickOutside={false}>
                {editMessage && (
                    <TextInput
                        label="message"
                        // @ts-ignore
                        onChange={(e) => setEditMessage((p) => ({...p, content: e.target.value}))}
                        value={editMessage?.content}/>
                )}

                <Button mt={15} onClick={updateMessage}>update</Button>
            </Modal>

            {/* messages box*/}
            <Box h="100%" sx={{overflowY: 'auto', flexShrink: 1, flexBasis: '100%'}}>
                {
                    messages.items.map(msg => (
                        <Flex
                            className={msg.from === currentUser._id ? classes.myMessage : classes.message}
                            p={10}
                            key={msg._id}>
                            {
                                msg.from === currentUser._id && (
                                    <Menu>
                                        <Menu.Target>
                                            <button>:::</button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item onClick={() => setEditMessage(msg)}>Edit</Menu.Item>
                                            <Menu.Item onClick={deleteMessage(msg)}>Delete</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                )
                            }
                            <ScrollArea className="message-wrap">
                                <p>
                                    {msg.content}
                                </p>
                            </ScrollArea>
                        </Flex>
                    ))
                }
            </Box>
            {/* compose message*/}
            <Flex p={10}>
                <TextInput
                    onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
                    value={message}
                    onChange={(e) => setMassage(e.target.value)}
                    w="100%"/>
                <Button onClick={sendMessage}>send</Button>
            </Flex>
        </Flex>
    );
}

export default ChatBox;
