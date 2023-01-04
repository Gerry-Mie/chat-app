import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInterface from '../../types/user-interface';


interface State {
    data: null | UserInterface
}

const initialState: State = {
    data: null
}

const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set_user(state, actioin: PayloadAction<null | UserInterface>) {
            state.data = actioin.payload
        }
    }
})

export const {set_user} = userslice.actions

export default userslice.reducer
