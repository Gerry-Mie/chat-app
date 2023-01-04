import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Selected {
    chatId: string,
    userId: string
    name: string
}

interface State {
    selected: null | Selected
}

const initialState: State = {
    selected: null
}

const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chat_set_selected(state, action: PayloadAction<null | Selected>) {
            state.selected = action.payload
        }
    }
})

export const {chat_set_selected} = chat.actions

export default chat.reducer
