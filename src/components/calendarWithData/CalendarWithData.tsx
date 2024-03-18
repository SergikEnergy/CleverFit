import { MouseEvent, FC, useState, useEffect, useContext } from 'react';
import { TrainingsResponseType } from '@redux/API/api-types';
import { Calendar, Badge } from 'antd';
import { ruLocale } from './CalendarWithData.data';
import { CustomCalendarModal } from '@components/customCalendarModal';
import { DrawerTrainsContext, CollapsedContext } from '../../reactContexts';
import { getCellData, filterDataByDaySortByDate, isCurrentMonth } from './CalendarWithData.utils';
import { ICalenDarWithDataProps, IModalPosition } from './CalendarWithData.types';
import { dateFullFormatWithDash } from '@utils/constants/dateFormats';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/ru';
moment.locale('ru');

import classes from './CalendarWithData.module.css';
import classnames from 'classnames';

export const CalenDarWithData: FC<ICalenDarWithDataProps> = ({
    dataForRender,
    allowedTrainsList,
}) => {
    const {
        date: dateFromContext,
        resetExercises,
        changeEditedTrainData,
    } = useContext(DrawerTrainsContext);

    const { hideCollapsed, collapsed } = useContext(CollapsedContext);

    const [isFullScreen, setIsFullScreen] = useState(true);
    const [selectedCellData, setSelectedCellData] = useState<[] | TrainingsResponseType[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'train' | 'exercise'>('train');
    const [selectedDay, setSelectedDay] = useState<Moment>(moment());
    const [modalPosition, setModalPosition] = useState<IModalPosition>({
        top: 0,
        left: 0,
        right: 0,
        width: 0,
        heightSelectedCell: 0,
    });

    const listenChangeWidth = () => {
        if (window.innerWidth < 670) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true);
        }
    };

    const getModalDimensions = (
        id = selectedDay.format(dateFullFormatWithDash),
        setDay = false,
    ) => {
        const selectedCell = document.querySelector(`td[title="${id}"]`);
        const modalParent = document.querySelector('#modalWrapperCalendar');
        if (selectedCell && modalParent) {
            if (setDay) {
                setSelectedDay(moment(id, dateFullFormatWithDash));
            }

            const {
                top: topModal,
                left: leftModal,
                right: rightModal,
                width,
                height: heightSelectedCell,
            } = selectedCell.getBoundingClientRect();
            const {
                top: topParent,
                left: leftParent,
                right: rightParent,
            } = modalParent.getBoundingClientRect();
            return {
                topModal,
                topParent,
                leftModal,
                leftParent,
                rightModal,
                rightParent,
                width,
                heightSelectedCell,
            };
        }
    };

    const changeModalType = () => {
        setModalType((prev) => (prev === 'train' ? 'exercise' : 'train'));
    };

    useEffect(() => {
        const correctModalPosition = () => {
            if (isModalVisible) {
                const modalSizes = getModalDimensions(selectedDay.format(dateFullFormatWithDash));
                if (modalSizes) {
                    setModalPosition({
                        top: modalSizes.topModal - modalSizes.topParent,
                        left: modalSizes.leftModal - modalSizes.leftParent,
                        right: modalSizes.rightParent - modalSizes.rightModal,
                        width: modalSizes.width,
                        heightSelectedCell: modalSizes.heightSelectedCell,
                    });
                }
            }
        };
        listenChangeWidth();
        window.addEventListener('resize', listenChangeWidth);
        window.addEventListener('resize', correctModalPosition);
        return () => {
            window.removeEventListener('resize', listenChangeWidth);
            window.removeEventListener('resize', correctModalPosition);
        };
    }, []);

    useEffect(() => {
        changeModalType();
        if (dateFromContext) {
            const updatedData = filterDataByDaySortByDate(dateFromContext, dataForRender);
            setSelectedCellData(updatedData);
        }
    }, [dataForRender]);

    const handleDateClick = async (
        currentData: TrainingsResponseType[] | [],
        event: MouseEvent<HTMLDivElement>,
    ) => {
        if (!isFullScreen) {
            hideCollapsed();
        }
        resetExercises();
        changeEditedTrainData('', '');
        setModalType('train');
        const id = event.currentTarget.id;
        if (isFullScreen || (!isFullScreen && isCurrentMonth(id))) {
            event.stopPropagation();
            setIsModalVisible(false);

            const modalSizes = getModalDimensions(id, true);
            if (modalSizes) {
                setSelectedCellData(currentData);
                setModalPosition({
                    top: modalSizes.topModal - modalSizes.topParent,
                    left: modalSizes.leftModal - modalSizes.leftParent,
                    right: modalSizes.rightParent - modalSizes.rightModal,
                    width: modalSizes.width,
                    heightSelectedCell: modalSizes.heightSelectedCell,
                });
                setTimeout(() => {
                    setIsModalVisible(true);
                }, 0);
                //предотвращает мерцание кнопки создать дизаблейд - если кликаем по предыдущему компоненту - то получаем изначально модалка появляется с незадизейбленной - потом правильно рисуется- но тест не прошел - если можно подскажите плиз, как быть здесь получше - все перерыл - но лучшего костыля не нашел - это позволяет выполнить функцию после очереди отрисовок реакт...
            }
        } else {
            setIsModalVisible(false);
        }
    };

    const dateCellRender = (date: Moment) => {
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

    if (dataForRender.length === 0 && allowedTrainsList.length === 0) {
        return (
            <Calendar
                className={classes.calendar}
                locale={ruLocale}
                defaultValue={moment()}
                fullscreen={isFullScreen}
            />
        );
    } else {
        return (
            <>
                <CustomCalendarModal
                    modalType={modalType}
                    changeModalType={changeModalType}
                    isModalVisible={isModalVisible}
                    isCentered={!isFullScreen}
                    value={selectedDay}
                    trains={selectedCellData}
                    modalPosition={modalPosition}
                    widthModal={isFullScreen ? '264px' : ''}
                    closeModal={() => {
                        setIsModalVisible(false);
                    }}
                />

                <Calendar
                    className={classes.calendar}
                    fullscreen={isFullScreen}
                    locale={ruLocale}
                    dateCellRender={dateCellRender}
                    defaultValue={moment()}
                />
            </>
        );
    }
};
