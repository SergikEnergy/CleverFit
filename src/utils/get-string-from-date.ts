import moment from 'moment';

import { dateDayMonthFormat, dateFullStringFormat } from './constants/date-formats';

export const getStringFromDate = (date: string | number): string => {
    if (typeof date === 'number') {
        return moment(date).format(dateDayMonthFormat);
    }

    return moment(date, dateFullStringFormat).format(dateDayMonthFormat);
};
