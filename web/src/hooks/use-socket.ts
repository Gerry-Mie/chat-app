import { useContext } from 'react';
import { Socket } from '../context/socket-provider';

const useSocket = () => useContext(Socket)
export default useSocket;
