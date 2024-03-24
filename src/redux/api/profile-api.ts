import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import { ResponseUserInfoType } from './api-types';

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: (build) => ({
        getUserInfo: build.query<ResponseUserInfoType, void>({
            query: () => ({
                url: 'user/me',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useGetUserInfoQuery } = profileAPI;
