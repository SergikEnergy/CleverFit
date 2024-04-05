import { PartnersResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TrainingPartnersType = {
    userPartners: PartnersResponseType[];
};

const initialTrainingPartnersState: TrainingPartnersType = {
    userPartners: [],
};

const slice = createSlice({
    name: 'trainingPartners',
    initialState: initialTrainingPartnersState,
    reducers: {
        setTrainingPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.userPartners = payload;
            }
        },
        resetTrainingPartners: (state) => {
            state.userPartners = [];
        },
    },
});

export const { setTrainingPartners, resetTrainingPartners } = slice.actions;
export const partnersReducer = slice.reducer;
