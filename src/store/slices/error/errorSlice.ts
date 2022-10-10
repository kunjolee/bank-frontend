import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../../../interfaces';

interface InitialState {
    error: IError 
}

const initialState: InitialState = {
    error: {
        isError: false,
        message: '',
        status: 0,
        statusText: ''
    }
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<IError>) => {
            state.error = action.payload
        }
    }
});

export const { setError } = errorSlice.actions;