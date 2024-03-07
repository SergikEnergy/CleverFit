import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { API_BASE_URL } from './api-data';
import { ITrainingsResponse, IAllowedTrainResponse } from './api-types';

export const calendarAPI = createApi({
    reducerPath: 'calendarAPI',
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
        getAllTrainings: build.query<ITrainingsResponse[], void>({
            query: () => ({
                url: 'training',
                credentials: 'include',
            }),
        }),
        getAllowedTrainsList: build.query<IAllowedTrainResponse[], void>({
            query: () => ({
                url: 'catalogs/training-list',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useLazyGetAllTrainingsQuery, useLazyGetAllowedTrainsListQuery } = calendarAPI;
