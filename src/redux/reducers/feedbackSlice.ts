import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFeedbackData {
    rating: number | null;
    comment: string;
}

const initialFeedbackState: IFeedbackData = {
    rating: null,
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
        resetFeedback: (state) => {
            state.comment = '';
            state.rating = null;
        },
    },
});

export const { setFeedback, resetFeedback } = slice.actions;
export const feedbackReducer = slice.reducer;
