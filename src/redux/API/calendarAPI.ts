import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { API_BASE_URL } from './api-data';
import { ITrainingsResponse, IAllowedTrainResponse, NewTrainRequestType } from './api-types';

export const calendarAPI = createApi({
    reducerPath: 'calendarAPI',
    tagTypes: ['Trainings'],
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
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({ type: 'Trainings' as const, _id })),
                          { type: 'Trainings', id: 'LIST' },
                      ]
                    : [{ type: 'Trainings', id: 'LIST' }],
        }),
        getAllowedTrainsList: build.query<IAllowedTrainResponse[], void>({
            query: () => ({
                url: 'catalogs/training-list',
                credentials: 'include',
            }),
        }),
        addNewTrain: build.mutation<void, NewTrainRequestType>({
            query: (body) => ({
                url: 'training',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Trainings'],
        }),
    }),
});

export const {
    useLazyGetAllTrainingsQuery,
    useLazyGetAllowedTrainsListQuery,
    useAddNewTrainMutation,
} = calendarAPI;
