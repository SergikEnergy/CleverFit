import moment from 'moment';

import { DAY_PER_MONTH, DAY_PER_WEEK } from './constants/achievements-data';
import { dateDayMonthFormat } from './constants/date-formats';

export const createLastWeekData = (): string[] => {
    const firstDay = moment().subtract(DAY_PER_WEEK - 1, 'days');
    const weekDays: string[] = [firstDay.format(dateDayMonthFormat)];

    for (let i = 1; i < DAY_PER_WEEK; i++) {
        const day = firstDay.clone().add(i, 'days').format(dateDayMonthFormat);

        weekDays.push(day);
    }

    return weekDays;
};

export const sortByDayLastWeekData = () => {
    const data = createLastWeekData();

    return data.sort(
        (date1, date2) =>
            moment(date1, dateDayMonthFormat).weekday() -
            moment(date2, dateDayMonthFormat).weekday(),
    );
};

export const createLastMonth = (): string[] => {
    const now = moment();
    const currentWeekDay = now.weekday();
    let firstDay = now.clone();

    if (currentWeekDay === 6) {
        firstDay = firstDay.subtract(DAY_PER_MONTH - 1, 'days');
    } else {
        firstDay = firstDay.add(6 - currentWeekDay, 'days').subtract(DAY_PER_MONTH - 1, 'days');
    }

    const monthDays = [firstDay.format(dateDayMonthFormat)];

    for (let i = 1; i < DAY_PER_MONTH; i++) {
        const day = firstDay.clone().add(i, 'days').format(dateDayMonthFormat);

        monthDays.push(day);
    }

    return monthDays;
};
