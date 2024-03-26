import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { CustomCalendarModal } from '@components/custom-calendar-modal';
import { TrainingsResponseType } from '@redux/api/api-types';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';

import { CollapsedContext, DrawerTrainsContext } from '../../react-contexts';

import { DataForCells } from './components/data-for-cells';
import { getModalDimensions } from './components/data-for-cells.itils';
import { modalInitialPosition, ruLocale } from './calendar-with-data.data';
import { CalenDarWithDataPropsType, ModalPositionType } from './calendar-with-data.types';
import { filterDataByDaySortByDate } from './calendar-with-data.utils';

import classes from './calendar-with-data.module.css';

import 'moment/dist/locale/ru';

moment.locale('ru');

export const CalenDarWithData: FC<CalenDarWithDataPropsType> = ({
    dataForRender,
    allowedTrainsList,
}) => {
    const {
        date: dateFromContext,
        resetExercises,
        changeEditedTrainData,
    } = useContext(DrawerTrainsContext);

    const { hideCollapsed } = useContext(CollapsedContext);

    const [isFullScreen, setIsFullScreen] = useState(true);
    const [selectedCellData, setSelectedCellData] = useState<[] | TrainingsResponseType[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'train' | 'exercise'>('train');
    const [selectedDay, setSelectedDay] = useState<Moment>(moment());
    const [modalPosition, setModalPosition] = useState<ModalPositionType>(modalInitialPosition);

    const listenChangeWidth = () => {
        if (window.innerWidth < 670) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true);
        }
    };

    const changeModalType = () => {
        setModalType((prev) => (prev === 'train' ? 'exercise' : 'train'));
    };

    useEffect(() => {
        const correctModalPosition = () => {
            if (isModalVisible) {
                const modalSizes = getModalDimensions(selectedDay, setSelectedDay);

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
        correctModalPosition();
        hideCollapsed();
        window.addEventListener('resize', listenChangeWidth);
        window.addEventListener('resize', correctModalPosition);

        return () => {
            window.removeEventListener('resize', listenChangeWidth);
            window.removeEventListener('resize', correctModalPosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        changeModalType();
        if (dateFromContext) {
            const updatedData = filterDataByDaySortByDate(dateFromContext, dataForRender);

            setSelectedCellData(updatedData);
        }
    }, [dataForRender, dateFromContext]);

    const dateCellRender = (date: Moment) => (
        <DataForCells
            date={date}
            dataForRender={dataForRender}
            isFullScreen={isFullScreen}
            hideCollapsed={hideCollapsed}
            resetExercises={resetExercises}
            setModalType={setModalType}
            changeEditedTrainData={changeEditedTrainData}
            setIsModalVisible={setIsModalVisible}
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
            setSelectedCellData={setSelectedCellData}
            setModalPosition={setModalPosition}
        />
    );

    if (dataForRender.length === 0 && allowedTrainsList.length === 0) {
        return (
            <Calendar
                className={classes.calendar}
                locale={ruLocale}
                defaultValue={moment()}
                fullscreen={isFullScreen}
            />
        );
    }

    return (
        <Fragment>
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
        </Fragment>
    );
};