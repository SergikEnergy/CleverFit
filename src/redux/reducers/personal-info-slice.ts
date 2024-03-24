import { ResponseUserInfoType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type GoogleOrFormType = 'form' | 'google';
export type LoggedViaType = { createdFrom: GoogleOrFormType };
export type PersonalUserInfoType = ResponseUserInfoType & LoggedViaType;

const initialUserInfoState: PersonalUserInfoType = {
    email: '',
    createdFrom: 'form',
    imgSrc: '',
    birthday: '',
    firstName: '',
    lastName: '',
    tariff: { tariffId: '', expired: '' },
    readyForJointTraining: false,
    sendNotification: false,
};

const slice = createSlice({
    name: 'personalInfo',
    initialState: initialUserInfoState,
    reducers: {
        savePersonalInfoAfterRegistration: (
            state,
            {
                payload: { email, firstName, lastName, birthday, imgSrc, tariff },
            }: PayloadAction<Omit<PersonalUserInfoType, 'createdFrom'>>,
        ) => {
            state.email = email;
            if (birthday) state.birthday = birthday;
            if (imgSrc) state.imgSrc = imgSrc;
            if (firstName) state.firstName = firstName;
            if (lastName) state.lastName = lastName;
            if (tariff) state.tariff = tariff;
        },
        setEntryPoint: (state, { payload: createdFrom }: PayloadAction<GoogleOrFormType>) => {
            state.createdFrom = createdFrom;
        },
    },
});

export const { savePersonalInfoAfterRegistration, setEntryPoint } = slice.actions;
export const personalInfoReducer = slice.reducer;
