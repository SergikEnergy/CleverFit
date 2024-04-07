import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import {
    AllInvitationsResponseType,
    InvitationAnswerRequestType,
    InvitationRequestType,
    InvitationResponseType,
} from './api-types';

export const invitationsAPI = createApi({
    reducerPath: 'userInvitations',
    tagTypes: ['Invitations'],
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
        getAllInvitations: build.query<AllInvitationsResponseType[], void>({
            query: () => ({
                url: 'invite',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({ type: 'Invitations' as const, _id })),
                          'Invitations',
                      ]
                    : ['Invitations'],
        }),
        sendInvitation: build.mutation<InvitationResponseType, InvitationRequestType>({
            query: (body) => ({
                url: 'invite',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        acceptInvitation: build.mutation<InvitationResponseType, InvitationAnswerRequestType>({
            query: (body) => ({
                url: 'invite',
                method: 'PUT',
                body,
                credentials: 'include',
                invalidatesTags: ['Invitations'],
            }),
        }),
        rejectInvitation: build.mutation<void, { id: string }>({
            query: (data) => ({
                url: `invite/${data.id}`,
                method: 'DELETE',
                credentials: 'include',
                invalidatesTags: ['Invitations'],
            }),
        }),
    }),
});

export const {
    useSendInvitationMutation,
    useGetAllInvitationsQuery,
    useLazyGetAllInvitationsQuery,
    useAcceptInvitationMutation,
    useRejectInvitationMutation,
} = invitationsAPI;
