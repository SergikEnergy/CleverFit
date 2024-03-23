import { TrainingsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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
