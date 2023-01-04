import Auth from './pages/auth';
import initUser from './hoc/initUser';
import Chat from './pages/chat';
import { useAppSelector } from './store';

const App = () => {
    const user = useAppSelector(state => state.user.data)
    return user ? <Chat/> : <Auth/>
}

export default initUser(App)
