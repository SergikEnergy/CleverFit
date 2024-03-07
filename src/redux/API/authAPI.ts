import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import {
    IRequest,
    IRegistrationResponse,
    ILoginResponse,
    ICheckEmailResponse,
    IConfirmRequest,
    IConfirmResponse,
    IChangePasswordResponse,
    IChangePasswordRequest,
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
        registerUser: build.mutation<IRegistrationResponse, IRequest>({
            query: (body) => ({
                url: 'auth/registration',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        loginUser: build.mutation<ILoginResponse, IRequest>({
            query: (body) => ({
                url: 'auth/login',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        checkEmail: build.mutation<ICheckEmailResponse, IRequest>({
            query: (body) => ({
                url: 'auth/check-email',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        confirmEmail: build.mutation<IConfirmResponse, IConfirmRequest>({
            query: (body) => ({
                url: 'auth/confirm-email',
                body,
                method: 'POST',
                credentials: 'include',
            }),
        }),
        changePassword: build.mutation<IChangePasswordResponse, IChangePasswordRequest>({
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
