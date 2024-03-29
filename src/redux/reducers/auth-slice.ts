import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { getParamFromStorage } from './auth-slice.utils';

type AuthUserState = {
    email: string;
    password: string;
    token: string | null;
    rememberMe: boolean;
};

const initialToken = getParamFromStorage(LOCAL_STORAGE_AUTH_PARAM, 'token', null);
const initialEmail = getParamFromStorage(LOCAL_STORAGE_AUTH_PARAM, 'email', '') as string;

const initialUserAuthState: AuthUserState = {
    email: initialEmail,
    password: '',
    token: initialToken,
    rememberMe: false,
};

const slice = createSlice({
    name: 'auth',
    initialState: initialUserAuthState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { email, token, password, rememberMe },
            }: PayloadAction<{
                email: string;
                password: string;
                token: string;
                rememberMe: boolean;
            }>,
        ) => {
            state.email = email;
            state.password = password;
            state.token = token;
            state.rememberMe = rememberMe;
        },
        saveCredentialsToStorage: (state) => {
            const userData = { email: state.email, token: state.token };

            if (state.rememberMe) {
                localStorage.setItem(LOCAL_STORAGE_AUTH_PARAM, JSON.stringify(userData));
            }
        },
        resetCredentials: (state) => {
            state.email = '';
            state.password = '';
            state.token = null;
            state.rememberMe = false;
        },
    },
});

export const { setCredentials, resetCredentials, saveCredentialsToStorage } = slice.actions;

export const authReducer = slice.reducer;
