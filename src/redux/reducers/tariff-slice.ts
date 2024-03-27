import { TariffResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type TariffListType = {
    tariffs: TariffResponseType[];
};

const initialState: TariffListType = { tariffs: [] };

const slice = createSlice({
    name: 'tariffsList',
    initialState,
    reducers: {
        saveAvailableTariffs: (state, { payload }: PayloadAction<TariffListType>) => {
            state.tariffs = payload.tariffs;
        },
    },
});

export const { saveAvailableTariffs } = slice.actions;
export const tariffInfoReducer = slice.reducer;
