import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isOpenMenu: boolean;
}

const initialState: InitialState = {
    isOpenMenu: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setOpenMenu: (state, action: PayloadAction<boolean>) => {
            state.isOpenMenu = action.payload
        },
    }
});

export const { setOpenMenu } = uiSlice.actions;