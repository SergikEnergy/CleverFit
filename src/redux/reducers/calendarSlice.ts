import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TrainingsResponseType } from '@redux/API/api-types';

type UserTrainsPropsType = {
    userTrains: TrainingsResponseType[];
    isGetTrainsSuccessful: boolean;
};

const initialCalendarState: UserTrainsPropsType = {
    userTrains: [],
    isGetTrainsSuccessful: false,
};
const slice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {
        setUserTrainsFromServer: (state, { payload }: PayloadAction<TrainingsResponseType[]>) => {
            if (payload) {
                state.userTrains = payload;
                state.isGetTrainsSuccessful = true;
            }
        },
        resetUserTrainsFromServer: (state) => {
            state.userTrains = [];
            state.isGetTrainsSuccessful = false;
        },
    },
});

export const { setUserTrainsFromServer, resetUserTrainsFromServer } = slice.actions;
export const calendarReducer = slice.reducer;
