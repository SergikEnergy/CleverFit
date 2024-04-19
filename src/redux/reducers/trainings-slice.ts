import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, current } from '@reduxjs/toolkit';
import { DAY_PER_MONTH, DAY_PER_WEEK } from '@utils/constants/achievements-data';
import { dateFullStringFormat } from '@utils/constants/date-formats';
import moment from 'moment';

export type FilterPeriodType = 'week' | 'month';
export const defaultAllTrainingKey = 'all';

type UserTrainingsPropsType = {
    userTrainings: TrainingsResponseType[];
    allowedTrainingsList: AllowedTrainResponseType[];
    filteredTrainings: TrainingsResponseType[];
    activeTrainings: string;
    selectedPeriod: FilterPeriodType;
};

const initialTrainingsState: UserTrainingsPropsType = {
    userTrainings: [],
    allowedTrainingsList: [],
    filteredTrainings: [],
    activeTrainings: defaultAllTrainingKey,
    selectedPeriod: 'week',
};

const slice = createSlice({
    name: 'userTrainings',
    initialState: initialTrainingsState,
    reducers: {
        setUserTrainingsFromServer: (
            state,
            { payload }: PayloadAction<TrainingsResponseType[]>,
        ) => {
            if (payload) {
                state.userTrainings = payload;
            }
        },
        updateUserTrainings: (state, { payload }: PayloadAction<TrainingsResponseType>) => {
            state.userTrainings = current(state.userTrainings)
                .concat(payload)
                .sort((item1, item2) => {
                    if (
                        item1.parameters &&
                        item1.parameters.period &&
                        item2.parameters &&
                        item2.parameters.period
                    ) {
                        return item1.parameters.period - item2.parameters.period;
                    }

                    return 0;
                });
        },
        resetUserTrainingsFromServer: (state) => {
            state.userTrainings = [];
            state.allowedTrainingsList = [];
            state.activeTrainings = '';
            state.filteredTrainings = [];
            state.selectedPeriod = 'week';
        },
        changeSelectedPeriod: (state, { payload }: PayloadAction<FilterPeriodType>) => {
            state.selectedPeriod = payload;
        },
        setAllowedTrainingsList: (
            state,
            { payload }: PayloadAction<AllowedTrainResponseType[]>,
        ) => {
            if (payload) {
                state.allowedTrainingsList = payload;
            }
        },
        changeActiveTraining: (state, { payload }: PayloadAction<string>) => {
            state.activeTrainings = payload;
        },
        setFilteredTrainingsByPeriod: (state, { payload }: PayloadAction<FilterPeriodType>) => {
            let currentDay = moment();
            const lastWeekDate = currentDay.clone().subtract(DAY_PER_WEEK, 'days');
            let lastMonthDate = currentDay.clone().subtract(DAY_PER_MONTH, 'days');
            const currentWeekDay = lastMonthDate.weekday();

            if (currentWeekDay !== 6) {
                lastMonthDate = lastMonthDate.add(6 - currentWeekDay, 'days');
            }

            if (state.userTrainings.length === 0) {
                state.filteredTrainings = [];
            } else if (state.userTrainings.length > 0 && payload === 'week') {
                state.filteredTrainings = state.userTrainings.filter((item) => {
                    if (typeof item.date === 'number') {
                        // case typeof number created for tests successfully only
                        return (
                            moment(item.date).isAfter(lastWeekDate) &&
                            moment(item.date).isSameOrBefore(currentDay)
                        );
                    }

                    return (
                        moment(item.date, dateFullStringFormat).isAfter(lastWeekDate) &&
                        moment(item.date, dateFullStringFormat).isSameOrBefore(currentDay)
                    );
                });
            } else if (state.userTrainings.length > 0 && payload === 'month') {
                if (currentWeekDay !== 6) {
                    currentDay = currentDay.add(6 - currentWeekDay, 'days');
                }
                state.filteredTrainings = state.userTrainings.filter((item) => {
                    if (typeof item.date === 'number') {
                        // case typeof number created for tests successfully only
                        return (
                            moment(item.date).isAfter(lastMonthDate) &&
                            moment(item.date).isSameOrBefore(currentDay)
                        );
                    }

                    return (
                        moment(item.date, dateFullStringFormat).isAfter(lastMonthDate) &&
                        moment(item.date, dateFullStringFormat).isSameOrBefore(currentDay)
                    );
                });
            }
        },
    },
});

export const {
    setUserTrainingsFromServer,
    resetUserTrainingsFromServer,
    setAllowedTrainingsList,
    updateUserTrainings,
    changeActiveTraining,
    setFilteredTrainingsByPeriod,
    changeSelectedPeriod,
} = slice.actions;

export const trainingsReducer = slice.reducer;
