import { FC, MouseEvent } from 'react';
import moment from 'moment';
import { filterDataByDaySortByDate } from '../CalendarWithData.utils';
import { TrainingsResponseType } from '@redux/API/api-types';
import { getCellData } from '../CalendarWithData.utils';
import { dateFullFormatWithDash } from '@utils/constants/dateFormats';
import { dateClickHandlerHelper } from './DataForCells.itils';
import { DataForCellsPropsType } from './DataForCells.types';

import { Badge } from 'antd';

import classes from './DataForCells.module.css';
import classnames from 'classnames';

export const DataForCells: FC<DataForCellsPropsType> = ({
    date,
    dataForRender,
    isFullScreen,
    hideCollapsed,
    resetExercises,
    setModalType,
    changeEditedTrainData,
    setIsModalVisible,
    setSelectedDay,
    selectedDay,
    setSelectedCellData,
    setModalPosition,
}) => {
    const currentData = filterDataByDaySortByDate(date, dataForRender);
    const cellData = getCellData(currentData);
    const isMobileData = !isFullScreen && cellData.length > 0;
    if (isMobileData) {
        const cellWithTrains = document.querySelector(
            `td[title="${date.format(dateFullFormatWithDash)}"]`,
        );
        if (cellWithTrains) {
            cellWithTrains.classList.add(classes['cell__mobile-data']);
        }
        const currentDayCell = document.querySelector(
            `td[title="${moment().format(dateFullFormatWithDash)}"]`,
        );
        if (currentDayCell) {
            currentDayCell.classList.add(classes['cell__mobile-active']);
        }
    }
    const handleDateClick = (
        currentData: TrainingsResponseType[] | [],
        event: MouseEvent<HTMLDivElement>,
    ) => {
        dateClickHandlerHelper(
            currentData,
            event,
            isFullScreen,
            hideCollapsed,
            resetExercises,
            setModalType,
            changeEditedTrainData,
            setIsModalVisible,
            setSelectedDay,
            selectedDay,
            setSelectedCellData,
            setModalPosition,
        );
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
            }}
            className={classnames(classes.cell)}
            id={date.format(dateFullFormatWithDash)}
            onClick={(event: MouseEvent<HTMLDivElement>) => handleDateClick(currentData, event)}
        >
            {!isMobileData && (
                <ul className={classnames(classes.exercises)}>
                    {isFullScreen && cellData.length > 0
                        ? cellData.map((train) => (
                              <li className={classes.exercise} key={train.id}>
                                  <Badge color={train.color} text={train.content} />
                              </li>
                          ))
                        : ''}
                </ul>
            )}
        </div>
    );
};
