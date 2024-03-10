import { MouseEvent, FC, useState, useEffect } from 'react';
import { ITrainingsResponse, IAllowedTrainResponse } from '@redux/API/api-types';
import { Calendar } from 'antd';
import { ruLocale } from './CalendarWithData.data';
import { CustomCalendarModal } from '@components/customCalendarModal';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/ru';
moment.locale('ru');

import classes from './CalendarWithData.module.css';

interface ICalenDarWithDataProps {
    dataForRender: ITrainingsResponse[] | [];
    allowedTrainsList: IAllowedTrainResponse[] | [];
}

export interface IModalPosition {
    top: number;
    left: number;
    right: number;
    width: number;
}

export const CalenDarWithData: FC<ICalenDarWithDataProps> = ({
    dataForRender,
    allowedTrainsList,
}) => {
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [selectedCellData, setSelectedCellData] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Moment>(moment());
    const [allowOpen, setAllowOpen] = useState(true);
    const [modalPosition, setModalPosition] = useState<IModalPosition>({
        top: 0,
        left: 0,
        right: 0,
        width: 0,
    });

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

    const handleDateClick = (cellData: string, event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsModalVisible(false);
        const selectedCell = document.querySelector(`td[title="${event.currentTarget.id}"]`);
        const modalParent = document.querySelector('#modalWrapperCalendar');
        if (selectedCell && modalParent) {
            setSelectedDay(moment(event.currentTarget.id, 'YYYY-MM-DD'));
            const {
                top: topModal,
                left: leftModal,
                right: rightModal,
                width,
            } = selectedCell.getBoundingClientRect();
            console.log(selectedCell.getBoundingClientRect(), 'cell');
            const {
                top: topParent,
                left: leftParent,
                right: rightParent,
            } = modalParent.getBoundingClientRect();
            console.log(modalParent.getBoundingClientRect(), 'parent');
            setSelectedCellData(cellData);
            setModalPosition({
                top: topModal - topParent,
                left: leftModal - leftParent,
                right: rightParent - rightModal,
                width,
            });
            setIsModalVisible(true);
        }
    };

    const dateCellRender = (date: Moment) => {
        const cellData = 'Data for ' + date.format('YYYY-MM-DD');

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                id={date.format('YYYY-MM-DD')}
                onClick={(event: MouseEvent<HTMLDivElement>) => handleDateClick(cellData, event)}
            >
                {cellData}
            </div>
        );
    };

    if (dataForRender.length === 0 && allowedTrainsList.length === 0) {
        return (
            <Calendar
                className={classes.calendar}
                locale={ruLocale}
                defaultValue={moment()}
                fullscreen={isFullScreen}
                onChange={(date) => {
                    console.log('date', date);
                }}
                onSelect={(value) => {
                    const target = document.querySelector(
                        `td[title="${value.format('YYYY-MM-DD')}"]`,
                    );
                    if (target) {
                        // handleDateClick(target);
                    }
                    console.log(value);
                }}
            />
        );
    } else {
        return (
            <>
                <CustomCalendarModal
                    isModalVisible={isFullScreen}
                    value={selectedDay}
                    modalPosition={modalPosition}
                    widthModal='200px'
                    height='120px'
                    allowOpen={allowOpen}
                />
                <Calendar
                    className={classes.calendar}
                    fullscreen={isFullScreen}
                    locale={ruLocale}
                    dateCellRender={dateCellRender}
                    defaultValue={moment()}
                    // onChange={(date) => {
                    //     console.log('date', date);
                    // }}
                    onPanelChange={(data, mode) => {
                        if (mode && isFullScreen) {
                            setAllowOpen(true);
                        }
                        if (mode && !isFullScreen) {
                            // setAllowOpen(false);
                        }
                        console.log('date panel', data);
                        console.log('mode panel', mode);
                    }}
                />
            </>
        );
    }
};
