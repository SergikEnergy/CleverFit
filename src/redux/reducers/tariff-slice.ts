import { TariffResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TariffListType = TariffResponseType[];

const initialState: TariffListType = [
    {
        _id: '',
        name: '',
        periods: [
            {
                text: '',
                cost: 0,
                days: 0,
            },
        ],
    },
];
const slice = createSlice({
    name: 'tariffsList',
    initialState,
    reducers: {
        saveAvailableTariffs: (state, { payload }: PayloadAction<TariffListType>) => {
            state = payload;
        },
    },
});

export const { saveAvailableTariffs } = slice.actions;
export const tariffInfoReducer = slice.reducer;
