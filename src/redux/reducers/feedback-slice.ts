import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type FeedbackDataPropsType = {
    rating: number | null;
    comment: string;
};

const initialFeedbackState: FeedbackDataPropsType = {
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
