import { ITrainingsResponse } from '@redux/API/api-types';
import moment, { Moment } from 'moment';
import { CellDataType } from './CalendarWithData.types';
import { ColorForTrain } from './CalendarWithData.data';

const getColorTrainByName = (trainName: string) => {
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
    dataForRender: ITrainingsResponse[],
): ITrainingsResponse[] | [] => {
    if (dataForRender.length > 0) {
        return dataForRender
            .filter((elem) => moment(elem.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
            .sort((elem1, elem2) => moment(elem2.date).diff(moment(elem1.date)));
    } else return [];
};

export const getCellData = (filteredData: ITrainingsResponse[] | []): CellDataType[] | [] => {
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
