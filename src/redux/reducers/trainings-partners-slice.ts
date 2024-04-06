import { PartnersResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TogetherTrainingsMode = 'random' | 'user' | 'similar';

type TrainingPartnersType = {
    userPartners: PartnersResponseType[];
    randomPartners: PartnersResponseType[];
    similarPartners: PartnersResponseType[];
    togetherMode: TogetherTrainingsMode;
    trainingType: string;
};

const initialTrainingPartnersState: TrainingPartnersType = {
    userPartners: [],
    randomPartners: [],
    similarPartners: [],
    togetherMode: 'user',
    trainingType: '',
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
        setTrainingType: (state, { payload }: PayloadAction<string>) => {
            if (payload) {
                state.trainingType = payload;
            }
        },
        setRandomPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.randomPartners = payload;
            }
        },
        setSimilarPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.randomPartners = payload;
            }
        },
        resetTrainingPartners: (state) => {
            state.userPartners = [];
            state.randomPartners = [];
            state.similarPartners = [];
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
    setTrainingType,
    setRandomPartners,
    setSimilarPartners,
    resetTrainingPartners,
    changeTrainingsMode,
} = slice.actions;

export const partnersReducer = slice.reducer;
