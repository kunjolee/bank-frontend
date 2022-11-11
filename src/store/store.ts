import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { errorSlice } from './slices/error';
import { uiSlice } from './slices/ui/';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        error: errorSlice.reducer,
        isOpenMenu: uiSlice.reducer
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk < ReturnType = void > = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
