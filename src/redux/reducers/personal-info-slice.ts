import { ImageUpdateResponseType, ResponseUserInfoType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type GoogleOrFormType = 'form' | 'google';
export type LoggedViaType = { createdFrom: GoogleOrFormType };
export type PersonalUserInfoType = ResponseUserInfoType & LoggedViaType & ImageUpdateResponseType;

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
    name: '',
    url: '',
};

const slice = createSlice({
    name: 'personalInfo',
    initialState: initialUserInfoState,
    reducers: {
        savePersonalInfoAfterRegistration: (
            state,
            {
                payload: {
                    email,
                    firstName,
                    lastName,
                    birthday,
                    imgSrc,
                    tariff,
                    readyForJointTraining,
                    sendNotification,
                },
            }: PayloadAction<ResponseUserInfoType>,
        ) => {
            state.email = email;
            if (birthday) state.birthday = birthday;
            if (imgSrc) state.imgSrc = imgSrc;
            if (firstName) state.firstName = firstName;
            if (lastName) state.lastName = lastName;
            if (tariff) state.tariff = tariff;
            if (readyForJointTraining) state.readyForJointTraining = readyForJointTraining;
            if (sendNotification) state.sendNotification = sendNotification;
        },
        setEntryPoint: (state, { payload: createdFrom }: PayloadAction<GoogleOrFormType>) => {
            state.createdFrom = createdFrom;
        },
        saveImgUploadData: (
            state,
            { payload: { name, url } }: PayloadAction<ImageUpdateResponseType>,
        ) => {
            state.name = name;
            state.url = url;
        },
        resetImgUploadData: (state) => {
            state.name = '';
            state.url = '';
        },
        resetImgSrcUrl: (state) => {
            state.imgSrc = '';
        },
        resetPersonalInfo: (state, payload) => {
            if (payload.type === 'RESET') {
                state = initialUserInfoState;
            }
        },
        updateSendNotification: (
            state,
            {
                payload: { sendNotification },
            }: PayloadAction<Pick<PersonalUserInfoType, 'sendNotification'>>,
        ) => {
            state.sendNotification = sendNotification;
        },
        updateReadyForTrain: (
            state,
            {
                payload: { readyForJointTraining },
            }: PayloadAction<Pick<PersonalUserInfoType, 'readyForJointTraining'>>,
        ) => {
            state.readyForJointTraining = readyForJointTraining;
        },
    },
});

export const {
    savePersonalInfoAfterRegistration,
    setEntryPoint,
    saveImgUploadData,
    resetImgSrcUrl,
    resetImgUploadData,
    resetPersonalInfo,
    updateReadyForTrain,
    updateSendNotification,
} = slice.actions;
export const personalInfoReducer = slice.reducer;
