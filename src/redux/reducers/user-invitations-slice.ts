import { AllInvitationsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';

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
        updateInvitations: (state, { payload }: PayloadAction<{ id: string }>) => {
            const userIndex = state.userInvitations.findIndex(
                (user) => user.from._id === payload.id,
            );

            if (userIndex !== -1) {
                state.userInvitations = current(state.userInvitations).filter(
                    (_, index) => userIndex !== index,
                );
            }
        },
    },
});

export const { setUserInvitations, resetUserInvitations, updateInvitations } = slice.actions;

export const userInvitationsReducer = slice.reducer;
