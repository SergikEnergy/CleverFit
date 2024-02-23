import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
    email: string;
    password: string;
    checkForgot?: boolean;
}

type AuthUserState = {
    user: IUser | null;
    token: string | null;
};

const initialUserAuthState: AuthUserState = {
    user: null,
    token: null,
};

const slice = createSlice({
    name: 'auth',
    initialState: initialUserAuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { user, token } }: PayloadAction<{ user: IUser; token: string }>,
        ) => {
            state.user = user;
            state.token = token;
        },
    },
});

export const { setCredentials } = slice.actions;
export const authReducer = slice.reducer;
