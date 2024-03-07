import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@redux/configure-store';
import { IFeedbackResponse, IPostFeedbackRequest } from './api-types.ts';
import { API_BASE_URL } from './api-data.ts';

export const feedbackApi = createApi({
    reducerPath: 'feedbackAPI',
    tagTypes: ['Feedbacks'],
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
        getAllFeedbacks: build.query<IFeedbackResponse[], void>({
            query: () => ({
                url: 'feedback',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Feedbacks' as const, id })), 'Feedbacks']
                    : ['Feedbacks'],
        }),
        addNewFeedback: build.mutation<void, IPostFeedbackRequest>({
            query: (body) => ({
                url: 'feedback',
                body,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Feedbacks'],
        }),
    }),
});

export const { useGetAllFeedbacksQuery, useAddNewFeedbackMutation } = feedbackApi;
