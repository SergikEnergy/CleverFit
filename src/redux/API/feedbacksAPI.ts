import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { IFeedbackResponse } from './api-types';

const API_BASE_URL = 'https://marathon-api.clevertec.ru/';

export const feedbackApi = createApi({
    reducerPath: 'feedbackAPI',
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
        getAllFeedbacks: build.query<IFeedbackResponse, void>({
            query: () => ({
                url: 'feedback',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useGetAllFeedbacksQuery } = feedbackApi;
