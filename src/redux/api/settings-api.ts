import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import { TariffResponseType } from './api-types';

export const settingsAPI = createApi({
    reducerPath: 'userSettings',
    // tagTypes: ['UserInfo'],
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
        getTariffsList: build.query<TariffResponseType[], void>({
            query: () => ({
                url: 'catalogs/tariff-list',
                credentials: 'include',
            }),
            // providesTags: (result) => (result ? [{ type: 'UserInfo', id: 1 }] : ['UserInfo']),
        }),
        // updateUserInfo: build.mutation<ResponseUserInfoType, RequestUserInfoType>({
        //     query: (userData) => ({
        //         url: 'user',
        //         method: 'PUT',
        //         body: userData,
        //         credentials: 'include',
        //     }),
        //     invalidatesTags: ['UserInfo'],
        // }),
    }),
});

export const { useLazyGetTariffsListQuery, useGetTariffsListQuery } = settingsAPI;
