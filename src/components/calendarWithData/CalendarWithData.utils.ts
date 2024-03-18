import { TrainingsResponseType } from '@redux/API/api-types';
import moment, { Moment } from 'moment';
import { CellDataType } from './CalendarWithData.types';
import { ColorForTrain } from './CalendarWithData.data';
import { shortMonthsRu } from './CalendarWithData.data';
import { dateFullFormatWithDash } from '@utils/constants/dateFormats';

export const getColorTrainByName = (trainName: string) => {
    switch (trainName.toLowerCase()) {
        case 'ноги':
            return ColorForTrain.legs;
        case 'руки':
            return ColorForTrain.hands;
        case 'силовая':
            return ColorForTrain.strength;
        case 'спина':
            return ColorForTrain.back;
        default:
            return ColorForTrain.chest;
    }
};

export const filterDataByDaySortByDate = (
    date: Moment,
    dataForRender: TrainingsResponseType[],
): TrainingsResponseType[] | [] => {
    if (dataForRender.length > 0) {
        return dataForRender
            .filter(
                (elem) =>
                    moment(elem.date).format(dateFullFormatWithDash) ===
                    date.format(dateFullFormatWithDash),
            )
            .sort((elem1, elem2) => moment(elem2.date).diff(moment(elem1.date)));
    } else return [];
};

export const getCellData = (filteredData: TrainingsResponseType[] | []): CellDataType[] | [] => {
    if (filteredData.length > 0) {
        return filteredData.map((train) => {
            return {
                id: train._id,
                color: getColorTrainByName(train.name),
                content: `${train.name}`,
            };
        });
    } else {
        return [];
    }
};

export const getMonthByName = (
    shortCut: string,
    namesMonth = shortMonthsRu,
): number | undefined => {
    const indexOfMonth = namesMonth.indexOf(shortCut);
    if (indexOfMonth !== -1) return indexOfMonth;
};

export const isCurrentMonth = (id: string): boolean => {
    const date = moment(id, dateFullFormatWithDash);
    const allowedMonth = date.month();
    const allowedYear = date.year();
    const selectedYear = Number(
        document
            .querySelector('.ant-picker-calendar-year-select span.ant-select-selection-item')
            ?.getAttribute('title'),
    );
    const selectedMonthShort = document
        .querySelector('.ant-picker-calendar-month-select span.ant-select-selection-item')
        ?.getAttribute('title');
    const selectedMonth = getMonthByName(selectedMonthShort as string);
    return allowedMonth === selectedMonth && allowedYear === selectedYear;
};
