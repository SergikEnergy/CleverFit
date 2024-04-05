import { PartnersResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TrainingPartnersType = {
    userPartners: PartnersResponseType[];
    randomPartners: PartnersResponseType[];
};

const initialTrainingPartnersState: TrainingPartnersType = {
    userPartners: [],
    randomPartners: [],
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
        setRandomPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.randomPartners = payload;
            }
        },
        resetTrainingPartners: (state) => {
            state.userPartners = [];
            state.randomPartners = [];
        },
    },
});

export const { setTrainingPartners, setRandomPartners, resetTrainingPartners } = slice.actions;
export const partnersReducer = slice.reducer;
