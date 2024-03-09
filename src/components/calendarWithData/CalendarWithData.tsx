import { FC, useState, useEffect } from 'react';
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
    const [isFullScreen, setIsFullScreen] = useState(true);

    const listenChangeWidth = () => {
        if (window.innerWidth < 590) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true);
        }
    };

    useEffect(() => {
        listenChangeWidth();
        window.addEventListener('resize', listenChangeWidth);
        return () => {
            window.removeEventListener('resize', listenChangeWidth);
        };
    }, []);

    if (dataForRender.length === 0 && allowedTrainsList.length === 0) {
        return (
            <Calendar
                locale={ruLocale}
                defaultValue={moment()}
                fullscreen={isFullScreen}
                onChange={(date) => {
                    console.log('date', date);
                }}
            />
        );
    } else {
        return (
            <Calendar
                fullscreen={isFullScreen}
                locale={ruLocale}
                defaultValue={moment()}
                onChange={(date) => {
                    console.log('date', date);
                }}
            />
        );
    }
};
