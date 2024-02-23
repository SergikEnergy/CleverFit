import { createSlice } from '@reduxjs/toolkit';

interface IUser {
    email: string;
    password: string;
    checkForgot?: boolean;
}

type AuthUserState = {
    user: IUser | null;
};

const initialUserState: AuthUserState = {
    user: null,
};

const slice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
});

// export const { setCredentials } = slice.actions;
export const userReducer = slice.reducer;
