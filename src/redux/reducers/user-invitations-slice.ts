import { AllInvitationsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UserInvitationsType = {
    userInvitations: AllInvitationsResponseType[];
};

const initialUserInvitationsState: UserInvitationsType = {
    userInvitations: [],
};

const slice = createSlice({
    name: 'invitationsForUser',
    initialState: initialUserInvitationsState,
    reducers: {
        setUserInvitations: (state, { payload }: PayloadAction<AllInvitationsResponseType[]>) => {
            if (payload) {
                state.userInvitations = payload;
            }
        },

        resetUserInvitations: (state) => {
            state.userInvitations = [];
        },
    },
});

export const { setUserInvitations, resetUserInvitations } = slice.actions;

export const userInvitationsReducer = slice.reducer;
