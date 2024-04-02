import { FC, Fragment, useContext, useEffect, useState, useRef } from 'react';
import { CustomCalendarModal } from '@components/custom-calendar-modal';
import { useWindowWidth } from '@hooks/use-window-size';
import { TrainingsResponseType } from '@redux/api/api-types';
import { EXERCISE_MODE, TRAIN_MODE, TrainOrExerciseModeType } from '@utils/constants/train-modes';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';

import { DrawerTrainsContext, useCollapseContext } from '../../react-contexts';

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

    const { hideCollapsed } = useCollapseContext();
    const windowWidth = useWindowWidth();

    const [isFullScreen, setIsFullScreen] = useState(true);
    const [selectedCellData, setSelectedCellData] = useState<[] | TrainingsResponseType[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<TrainOrExerciseModeType>(TRAIN_MODE);
    const [selectedDay, setSelectedDay] = useState<Moment>(moment());
    const [modalPosition, setModalPosition] = useState<ModalPositionType>(modalInitialPosition);
    const firstResize = useRef(true);

    useEffect(() => {
        if (windowWidth < 670 && firstResize.current) {
            hideCollapsed();
            firstResize.current = false;
        }
        if (windowWidth < 670) {
            setIsFullScreen(false);
        } else {
            setIsFullScreen(true);
        }
    }, [hideCollapsed, windowWidth]);

    const changeModalType = () =>
        setModalType((prev) => (prev === TRAIN_MODE ? EXERCISE_MODE : TRAIN_MODE));

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

        correctModalPosition();
        window.addEventListener('resize', correctModalPosition);

        return () => {
            window.removeEventListener('resize', correctModalPosition);
        };
    }, [isModalVisible, selectedDay]);

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
                closeModal={() => setIsModalVisible(false)}
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
