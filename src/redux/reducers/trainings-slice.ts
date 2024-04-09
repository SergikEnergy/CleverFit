import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';

type UserTrainingsPropsType = {
    userTrainings: TrainingsResponseType[];
    allowedTrainingsList: AllowedTrainResponseType[];
};

const initialTrainingsState: UserTrainingsPropsType = {
    userTrainings: [],
    allowedTrainingsList: [],
};

const slice = createSlice({
    name: 'userTrainings',
    initialState: initialTrainingsState,
    reducers: {
        setUserTrainingsFromServer: (
            state,
            { payload }: PayloadAction<TrainingsResponseType[]>,
        ) => {
            if (payload) {
                state.userTrainings = payload;
            }
        },
        updateUserTrainings: (state, { payload }: PayloadAction<TrainingsResponseType>) => {
            state.userTrainings = current(state.userTrainings).concat(payload);
        },
        resetUserTrainingsFromServer: (state) => {
            state.userTrainings = [];
            state.allowedTrainingsList = [];
        },
        setAllowedTrainingsList: (
            state,
            { payload }: PayloadAction<AllowedTrainResponseType[]>,
        ) => {
            if (payload) {
                state.allowedTrainingsList = payload;
            }
        },
    },
});

export const {
    setUserTrainingsFromServer,
    resetUserTrainingsFromServer,
    setAllowedTrainingsList,
    updateUserTrainings,
} = slice.actions;
export const trainingsReducer = slice.reducer;
