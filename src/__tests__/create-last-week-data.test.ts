// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import moment from 'moment';

import { DAY_PER_WEEK } from '../utils/constants/achievements-data';
import { dateDayMonthFormat } from '../utils/constants/date-formats';
import { createLastWeekData } from '../utils/create-last-period-data';

describe('test create last week func', () => {
    it('should return data array with DAY_PER_WEEK length', () => {
        const weekData = createLastWeekData();

        expect(weekData).toHaveLength(7);
    });

    it('should return actual week for date before or same now', () => {
        const now = moment();
        const firstWeekDay = now.clone().subtract(DAY_PER_WEEK - 1, 'days');
        const weekData = createLastWeekData();

        expect(weekData[0]).toBeTruthy();
        expect(weekData[0]).toEqual(firstWeekDay.format(dateDayMonthFormat));
        expect(weekData.at(-1)).toEqual(now.format(dateDayMonthFormat));
    });

    it('should return an array with dates as a consequence', () => {
        const lastWeek = createLastWeekData();

        for (let i = 1; i < lastWeek.length; i++) {
            const curr = moment(lastWeek[i], dateDayMonthFormat);
            const prev = moment(lastWeek[i - 1], dateDayMonthFormat);

            expect(curr.isAfter(prev)).toBeTruthy();
        }
    });
});
