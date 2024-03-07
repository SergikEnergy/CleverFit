import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialCalendarState = {
    user: null,
};
const slice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {},
});

export const calendarReducer = slice.reducer;
