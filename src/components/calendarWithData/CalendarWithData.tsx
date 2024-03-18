import { FC, useState, useEffect, useContext } from 'react';
import { TrainingsResponseType } from '@redux/API/api-types';
import { DataForCells } from './components/DataForCells';
import { Calendar } from 'antd';
import { ruLocale } from './CalendarWithData.data';
import { CustomCalendarModal } from '@components/customCalendarModal';
import { DrawerTrainsContext, CollapsedContext } from '../../reactContexts';
import { filterDataByDaySortByDate } from './CalendarWithData.utils';
import { ModalPositionType, CalenDarWithDataPropsType } from './CalendarWithData.types';
import { modalInitialPosition } from './CalendarWithData.data';
import { getModalDimensions } from './components/DataForCells.itils';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/ru';
moment.locale('ru');

import classes from './CalendarWithData.module.css';

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
    }, []);

    useEffect(() => {
        changeModalType();
        if (dateFromContext) {
            const updatedData = filterDataByDaySortByDate(dateFromContext, dataForRender);
            setSelectedCellData(updatedData);
        }
    }, [dataForRender]);

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
