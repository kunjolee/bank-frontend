import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../../../interfaces';

interface InitialState {
    auth: IAuth | null;
}

const initialState: InitialState = {
    auth: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<IAuth>) => {
            state.auth = action.payload;
        },
        setLogout: (state, action: PayloadAction<IAuth>) => {
            state.auth =  action.payload;
        },
        setCreateUser: (state, action: PayloadAction<IAuth>) => {
            state.auth = action.payload
        }
    }
});

export const { setCreateUser, setLogin, setLogout } = authSlice.actions;