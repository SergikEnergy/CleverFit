import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import collapseMenuReducer from './reducers/collapseMenu';

export const store = configureStore({
    reducer: {
        collapse: collapseMenuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
