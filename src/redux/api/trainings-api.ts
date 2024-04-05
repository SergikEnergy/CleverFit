import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import {
    AllowedTrainResponseType,
    ChangeFutureTrainRequestType,
    NewTrainRequestType,
    PartnersResponseType,
    TrainingsResponseType,
} from './api-types';

export const trainingsAPI = createApi({
    reducerPath: 'trainingsAPI',
    tagTypes: ['Trainings', 'Partners'],
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
        getAllTrainings: build.query<TrainingsResponseType[], void>({
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
        getAllowedTrainsList: build.query<AllowedTrainResponseType[], void>({
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
        changeTrain: build.mutation<void, ChangeFutureTrainRequestType>({
            query: (data) => ({
                url: `training/${data.id}`,
                body: data.body,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Trainings'],
        }),
        getAllTrainingsPartners: build.query<PartnersResponseType[], void>({
            query: () => ({
                url: 'catalogs/training-pals',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Partners' as const, id })),
                          { type: 'Partners', id: 'LIST' },
                      ]
                    : [{ type: 'Partners', id: 'LIST' }],
        }),
        getAllRandomPartners: build.query<PartnersResponseType[], void>({
            query: () => ({
                url: 'catalogs/user-joint-training-list',
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLazyGetAllTrainingsQuery,
    useGetAllTrainingsQuery,
    useGetAllowedTrainsListQuery,
    useLazyGetAllowedTrainsListQuery,
    useAddNewTrainMutation,
    useChangeTrainMutation,
    useLazyGetAllTrainingsPartnersQuery,
    useGetAllTrainingsPartnersQuery,
    useLazyGetAllRandomPartnersQuery,
    useGetAllRandomPartnersQuery,
} = trainingsAPI;
