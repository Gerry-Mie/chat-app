import { MantineThemeOverride } from '@mantine/core';

const themeObject: MantineThemeOverride = {
    globalStyles: _theme => ({
        body: {
            fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
        },
        '*': {
            padding: 0,
            margin: 0,
            boxSizing: 'border-box',
        },
        '#root': {
            height: '100vh'
        },
    }),

    colors: {
        app: ['#1C7ED6','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']
    },
}

export default themeObject
