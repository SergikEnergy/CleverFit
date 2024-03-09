import { FC } from 'react';
import { ITrainingsResponse, IAllowedTrainResponse } from '@redux/API/api-types';
import { Calendar } from 'antd';
import { ruLocale } from './CalendarWithData.data';
import moment from 'moment';
import 'moment/dist/locale/ru';
moment.locale('ru');

import classes from './CalendarWithData.module.css';

interface ICalenDarWithDataProps {
    dataForRender: ITrainingsResponse[] | [];
    allowedTrainsList: IAllowedTrainResponse[] | [];
}

export const CalenDarWithData: FC<ICalenDarWithDataProps> = ({
    dataForRender,
    allowedTrainsList,
}) => {
    return (
        <Calendar
            locale={ruLocale}
            defaultValue={moment()}
            onChange={(date) => {
                console.log('date', date);
            }}
        ></Calendar>
    );
};
