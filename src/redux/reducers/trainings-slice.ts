import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UserTrainsPropsType = {
    userTrains: TrainingsResponseType[];
    allowedTrainingsList: AllowedTrainResponseType[];
};

const initialTrainingsState: UserTrainsPropsType = {
    userTrains: [],
    allowedTrainingsList: [],
};

const slice = createSlice({
    name: 'userTrainings',
    initialState: initialTrainingsState,
    reducers: {
        setUserTrainsFromServer: (state, { payload }: PayloadAction<TrainingsResponseType[]>) => {
            if (payload) {
                state.userTrains = payload;
            }
        },
        resetUserTrainsFromServer: (state) => {
            state.userTrains = [];
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

export const { setUserTrainsFromServer, resetUserTrainsFromServer, setAllowedTrainingsList } =
    slice.actions;
export const trainingsReducer = slice.reducer;
