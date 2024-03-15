import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITrainingsResponse } from '@redux/API/api-types';

interface IUserTrains {
    userTrains: ITrainingsResponse[];
    isGetTrainsSuccessful: boolean;
}

const initialCalendarState: IUserTrains = {
    userTrains: [],
    isGetTrainsSuccessful: false,
};
const slice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {
        setUserTrainsFromServer: (state, { payload }: PayloadAction<ITrainingsResponse[]>) => {
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
