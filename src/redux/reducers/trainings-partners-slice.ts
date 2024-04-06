import { PartnersResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TogetherTrainingsMode = 'random' | 'user';

type TrainingPartnersType = {
    userPartners: PartnersResponseType[];
    randomPartners: PartnersResponseType[];
    togetherMode: TogetherTrainingsMode;
};

const initialTrainingPartnersState: TrainingPartnersType = {
    userPartners: [],
    randomPartners: [],
    togetherMode: 'user',
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
            state.togetherMode = 'user';
        },
        changeTrainingsMode: (state, { payload }: PayloadAction<TogetherTrainingsMode>) => {
            if (payload) {
                state.togetherMode = payload;
            }
        },
    },
});

export const {
    setTrainingPartners,
    setRandomPartners,
    resetTrainingPartners,
    changeTrainingsMode,
} = slice.actions;
export const partnersReducer = slice.reducer;
