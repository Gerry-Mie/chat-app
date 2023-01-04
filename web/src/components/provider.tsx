import { FC, ReactNode } from 'react';
import { socket, Socket } from '../context/socket-provider';
import { MantineProvider } from '@mantine/core';
import themeObject from '../utils/theme-object';
import { NotificationsProvider } from '@mantine/notifications';
import { Provider as StoreProvider } from 'react-redux'
import { store } from '../store';
type Props = {
    children: ReactNode
}
const Provider: FC<Props> = ({children}) => {
    return (
        <StoreProvider store={store}>
            <MantineProvider theme={themeObject} withGlobalStyles withNormalizeCSS>
                <NotificationsProvider position="top-right">
                    <Socket.Provider value={socket}>
                        {children}
                    </Socket.Provider>
                </NotificationsProvider>
            </MantineProvider>
        </StoreProvider>
    );
}

export default Provider;
