import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserData {
    email: string;
    password: string;
    checkForgot?: boolean;
}

const initialUserState: IUserData = {
    email: '',
    password: '',
};

const slice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        saveRegistrationData: (
            state,
            { payload: { email, password } }: PayloadAction<{ email: string; password: string }>,
        ) => {
            state.email = email;
            state.password = password;
        },
        deleteRegistrationData: (state) => {
            state.email = '';
            state.password = '';
        },
    },
});

export const { saveRegistrationData, deleteRegistrationData } = slice.actions;
export const userReducer = slice.reducer;
