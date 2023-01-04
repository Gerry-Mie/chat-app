import { FC, useEffect, useState } from 'react';
import UserInterface from '../types/user-interface';
import axios from '../utils/axios';
import { useAppDispatch } from '../store';
import { set_user } from '../store/slice/user';
import useSocket from '../hooks/use-socket';

type Props = {
    user?: UserInterface | null
}
const initUser = (Component: FC<Props>) => () => {

    const [state, setState] = useState<'init' | 'error' | 'loaded'>('init')
    const [socketConnection, setSocketConnection] = useState<'init' | 'connected' | 'disconnected'>('init')
    const dispatch = useAppDispatch()
    const socket = useSocket()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return setState('loaded')

        axios.post('user/verify')
            .then(res => {
                dispatch(set_user(res.data))
                setState('loaded')
            })
            .catch(() => setState('error'))
    }, [])

    useEffect(() => {
        setInterval(()=> {
            setSocketConnection(socket.connected ? 'connected' : 'disconnected')
        },1000)
    }, [socket]);

    if (state === 'init' || socketConnection === 'init') return <h1>loading</h1>
    if (state === 'error') return <h1>Something went wrong</h1>
    if (socketConnection === 'disconnected') return <h1>Server error</h1>

    return <Component/>
}

export default initUser;
