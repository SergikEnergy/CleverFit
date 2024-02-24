import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { IRequest, IRegistrationResponse, ILoginResponse } from './api-types';

const API_BASE_URL = 'https://marathon-api.clevertec.ru/';

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
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
