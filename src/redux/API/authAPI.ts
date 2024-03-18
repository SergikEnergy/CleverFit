import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import {
    RequestType,
    RegistrationResponseType,
    LoginResponseType,
    CheckEmailResponseType,
    ConfirmRequestType,
    IConfirmResponseType,
    ChangePasswordResponseType,
    ChangePasswordRequestType,
} from './api-types.ts';
import { API_BASE_URL } from './api-data.ts';

export const authApi = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (build) => ({
        registerUser: build.mutation<RegistrationResponseType, RequestType>({
            query: (body) => ({
                url: 'auth/registration',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        loginUser: build.mutation<LoginResponseType, RequestType>({
            query: (body) => ({
                url: 'auth/login',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        checkEmail: build.mutation<CheckEmailResponseType, RequestType>({
            query: (body) => ({
                url: 'auth/check-email',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        confirmEmail: build.mutation<IConfirmResponseType, ConfirmRequestType>({
            query: (body) => ({
                url: 'auth/confirm-email',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        changePassword: build.mutation<ChangePasswordResponseType, ChangePasswordRequestType>({
            query: (body) => ({
                url: 'auth/change-password',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
