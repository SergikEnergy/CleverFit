// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from '@jest/globals';
import moment from 'moment';

import { DAY_PER_MONTH, DAY_PER_WEEK } from '../utils/constants/achievements-data';
import { dateDayMonthFormat } from '../utils/constants/date-formats';
import { createLastMonth } from '../utils/create-last-period-data';

describe('test create last month func', () => {
    it('should return data array with DAY_PER_WEEK length', () => {
        const weekData = createLastMonth();

        expect(weekData).toHaveLength(DAY_PER_MONTH);
    });

    it('should return actual month for day not a Sunday and Sunday', () => {
        const now = moment();
        const currDay = now.weekday();
        let firstDayInMonth = now.clone().subtract(DAY_PER_MONTH - 1, 'days');

        if (currDay !== DAY_PER_WEEK - 1) {
            firstDayInMonth = firstDayInMonth.add(DAY_PER_WEEK - 1 - currDay, 'days');
        }

        const lastDayInMonth = firstDayInMonth.clone().add(DAY_PER_MONTH - 1, 'days');

        const monthData = createLastMonth();

        expect(monthData[0]).toBeTruthy();
        expect(monthData[0]).toEqual(firstDayInMonth.format(dateDayMonthFormat));
        expect(monthData.at(-1)).toEqual(lastDayInMonth.format(dateDayMonthFormat));
    });

    it('should return an array with dates as a consequence', () => {
        const lastMonth = createLastMonth();

        for (let i = 1; i < lastMonth.length; i++) {
            const curr = moment(lastMonth[i], dateDayMonthFormat);
            const prev = moment(lastMonth[i - 1], dateDayMonthFormat);

            expect(curr.isAfter(prev)).toBeTruthy();
        }
    });
});
