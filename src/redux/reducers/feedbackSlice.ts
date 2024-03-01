import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFeedbackData {
    rating: number;
    comment: string;
}

const initialFeedbackState: IFeedbackData = {
    rating: 0,
    comment: '',
};

const slice = createSlice({
    name: 'feedback',
    initialState: initialFeedbackState,
    reducers: {
        setFeedback: (
            state,
            {
                payload: { rating, comment },
            }: PayloadAction<{
                rating: number;
                comment: string;
            }>,
        ) => {
            state.comment = comment;
            state.rating = rating;
        },
    },
});

export const { setFeedback } = slice.actions;
export const feedbackReducer = slice.reducer;
