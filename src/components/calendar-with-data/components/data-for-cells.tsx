import { FC, MouseEvent } from 'react';
import { TrainingsResponseType } from '@redux/api/api-types';
import { dateFullFormatWithDash } from '@utils/constants/date-formats';
import { Badge } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import { filterDataByDaySortByDate, getCellData } from '../calendar-with-data.utils';

import { dateClickHandlerHelper } from './data-for-cells.itils';
import { DataForCellsPropsType } from './data-for-cells.types';

import classes from './data-for-cells.module.css';

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
        newCurrentData: TrainingsResponseType[] | [],
        event: MouseEvent<HTMLDivElement>,
    ) => {
        dateClickHandlerHelper(
            newCurrentData,
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
            role='button'
            tabIndex={0}
            aria-label='cell-calendar'
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
            onKeyDown={() => {}}
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
