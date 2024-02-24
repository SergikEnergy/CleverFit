import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserData {
    email: string;
    password: string;
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
        removeRegistrationData: (state) => {
            state.email = '';
            state.password = '';
        },
        saveEmail: (state, { payload: { email } }: PayloadAction<{ email: string }>) => {
            state.email = email;
        },
    },
});

export const { saveRegistrationData, removeRegistrationData, saveEmail } = slice.actions;
export const userReducer = slice.reducer;
