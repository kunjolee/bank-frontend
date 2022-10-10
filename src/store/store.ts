import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { errorSlice } from './slices/error';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        error: errorSlice.reducer
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
