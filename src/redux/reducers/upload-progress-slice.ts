import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UploadProgressType = {
    uploadProgress: number;
};

const initialState: UploadProgressType = {
    uploadProgress: 0,
};

export const slice = createSlice({
    name: 'uploadProgress',
    initialState,
    reducers: {
        setUploadProgress: (state, { payload: uploadProgress }: PayloadAction<number>) => {
            state.uploadProgress = uploadProgress;
        },
    },
});

export const { setUploadProgress } = slice.actions;
export const uploadProgressReducer = slice.reducer;
