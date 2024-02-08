import { createSlice } from '@reduxjs/toolkit';

type InitialCollapseType = {
    collapsed: boolean;
};

const InitialCollapse: InitialCollapseType = {
    collapsed: false,
};

const collapseMenuSlice = createSlice({
    name: 'collapse',
    initialState: InitialCollapse,
    reducers: {
        toggleCollapse: (state) => {
            state.collapsed = !state.collapsed;
        },
    },
});

export const { toggleCollapse } = collapseMenuSlice.actions;
export default collapseMenuSlice.reducer;
