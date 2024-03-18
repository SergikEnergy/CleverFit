import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserDataPropsType = {
    email: string;
    password: string;
    confirmPassword?: string;
};

const initialUserState: UserDataPropsType = {
    email: '',
    password: '',
    confirmPassword: '',
};

const slice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        saveRegistrationData: (
            state,
            {
                payload: { email, password, confirmPassword },
            }: PayloadAction<{
                email: string;
                password: string;
                confirmPassword: string | undefined;
            }>,
        ) => {
            state.email = email;
            state.password = password;
            if (confirmPassword) {
                state.confirmPassword = confirmPassword;
            }
        },
        removeRegistrationData: (state) => {
            state.email = '';
            state.password = '';
            if (state.confirmPassword) {
                state.confirmPassword = '';
            }
        },
        saveEmail: (state, { payload: { email } }: PayloadAction<{ email: string }>) => {
            state.email = email;
        },
    },
});

export const { saveRegistrationData, removeRegistrationData, saveEmail } = slice.actions;
export const userReducer = slice.reducer;
