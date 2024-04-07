import { RootState } from '@redux/configure-store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from './api-data';
import {
    AllInvitationsResponseType,
    InvitationRequestType,
    InvitationResponseType,
} from './api-types';

export const invitationsAPI = createApi({
    reducerPath: 'userInvitations',
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
        }),
        sendInvitation: build.mutation<InvitationResponseType, InvitationRequestType>({
            query: (body) => ({
                url: 'invite',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useSendInvitationMutation,
    useGetAllInvitationsQuery,
    useLazyGetAllInvitationsQuery,
} = invitationsAPI;
