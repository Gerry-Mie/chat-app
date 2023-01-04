import { useEffect, useState } from 'react';
import MessageInterface from '../types/message-interface';
import axios from '../utils/axios';
import { useAppSelector } from '../store';

const useMessages = () => {
    const [items, setItems] = useState<MessageInterface[]>([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const selectedContact = useAppSelector(state => state.chat.selected!)

    useEffect(() => {
        axios.get('messages/' + selectedContact.chatId).then(({data}) => {
            setLoading(false)
            setItems(data)
        }).catch(() => {
            setError(true)
        })
    }, [selectedContact])

    const push = (message: MessageInterface) => setItems(prev => [...prev, message])
    const update = (message: MessageInterface) => {
        setItems(prev => prev.map(item => item._id === message._id ? message : item))
    }

    const remove = (id: string) => setItems(prev => prev.filter(item => item._id !== id))

    return {items, error, push, loading, remove, update}
}

export default useMessages;
