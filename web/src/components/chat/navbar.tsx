import { Navbar as MNavbar, Tabs } from '@mantine/core'
import Chats from './chats';
import Contacts from './contacts';

const Navbar = () => {
    return (
        <MNavbar width={{base: 300}}>
            <Tabs defaultValue="chats">
                <Tabs.List h={45}>
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
        </MNavbar>
    );
}

export default Navbar;
