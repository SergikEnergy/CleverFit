import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import {
    AllowedTrainResponseType,
    ChangeFutureTrainRequestType,
    NewTrainRequestType,
    PartnersResponseType,
    QueryPartnersTrainingType,
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
                    : ['Trainings'],
        }),
        getAllowedTrainsList: build.query<AllowedTrainResponseType[], void>({
            query: () => ({
                url: 'catalogs/training-list',
                credentials: 'include',
            }),
        }),
        addNewTrain: build.mutation<TrainingsResponseType, NewTrainRequestType>({
            query: (body) => ({
                url: 'training',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Trainings', 'Partners'],
        }),
        changeTrain: build.mutation<TrainingsResponseType, ChangeFutureTrainRequestType>({
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
                    : ['Partners'],
        }),
        getAllRandomPartners: build.query<PartnersResponseType[], void>({
            query: () => ({
                url: 'catalogs/user-joint-training-list',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Partners' as const, id })),
                          { type: 'Partners', id: 'LIST' },
                      ]
                    : ['Partners'],
        }),
        getAllSimilarPartners: build.query<PartnersResponseType[], QueryPartnersTrainingType>({
            query: (arg) => {
                const { trainingType } = arg;

                return {
                    url: 'catalogs/user-joint-training-list',
                    credentials: 'include',
                    params: { trainingType },
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Partners' as const, id })),
                          { type: 'Partners', id: 'LIST' },
                      ]
                    : ['Partners'],
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
    useLazyGetAllSimilarPartnersQuery,
} = trainingsAPI;
