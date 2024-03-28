import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import { RequestChangeTariffType, TariffResponseType } from './api-types';

export const settingsAPI = createApi({
    reducerPath: 'userSettings',
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
        }),
        updateSelectedTariff: build.mutation<void, RequestChangeTariffType>({
            query: (body) => ({
                url: 'tariff',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLazyGetTariffsListQuery,
    useGetTariffsListQuery,
    useUpdateSelectedTariffMutation,
} = settingsAPI;
