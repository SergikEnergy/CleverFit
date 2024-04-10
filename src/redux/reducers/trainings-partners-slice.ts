import { PartnersResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';

export type TogetherTrainingsMode = 'random' | 'user' | 'similar' | 'partners';

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
        updatePartnerStatus: (state, { payload }: PayloadAction<{ userId: string }>) => {
            let indexUser;

            indexUser = state.randomPartners.findIndex((user) => user.id === payload.userId);

            if (indexUser !== -1)
                state.randomPartners = current(state.randomPartners).map((user) =>
                    user.id === payload.userId ? { ...user, status: 'pending' } : user,
                );

            indexUser = state.similarPartners.findIndex((user) => user.id === payload.userId);

            if (indexUser !== -1)
                state.similarPartners = current(state.similarPartners).map((user) =>
                    user.id === payload.userId ? { ...user, status: 'pending' } : user,
                );
        },
        deleteMyPartner: (state, { payload }: PayloadAction<{ id: string }>) => {
            const indexUser = state.userPartners.findIndex((user) => user.id === payload.id);

            if (indexUser !== -1) {
                state.userPartners = current(state.userPartners).filter(
                    (_, index) => indexUser !== index,
                );
            }
        },
        addMyPartner: (state, { payload: user }: PayloadAction<PartnersResponseType>) => {
            state.userPartners = current(state.userPartners).concat(user);
        },
        setRandomPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.randomPartners = payload;
            }
        },
        setSimilarPartners: (state, { payload }: PayloadAction<PartnersResponseType[]>) => {
            if (payload) {
                state.similarPartners = payload;
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
    updatePartnerStatus,
    deleteMyPartner,
    addMyPartner,
} = slice.actions;

export const partnersReducer = slice.reducer;
