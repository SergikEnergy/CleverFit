import { FC, useContext, useState, useLayoutEffect } from 'react';
import { Moment } from 'moment';
import {
    checkNarrowFramesDay,
    getAllowedTrains,
    getExistedNotImplementedTrains,
} from './CustomCalendarModal.utils';
import { ModalPositionType } from '@components/calendarWithData/CalendarWithData.types';
import { TrainingsResponseType } from '@redux/API/api-types';
import { ModalCreateTrain, ModalSelectExercise } from './components';
import { DrawerTrainsContext } from '../../reactContexts';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

export type ModalModeType = 'train' | 'exercise';

type CustomCalendarModalPropsType = {
    widthModal: string;
    modalType: ModalModeType;
    modalPosition: ModalPositionType;
    value: Moment;
    trains: [] | TrainingsResponseType[];
    isCentered?: boolean;
    isModalVisible: boolean;
    closeModal: () => void;
    changeModalType: () => void;
};

export const CustomCalendarModal: FC<CustomCalendarModalPropsType> = ({
    modalPosition,
    value,
    widthModal,
    isCentered,
    isModalVisible,
    trains,
    modalType,
    changeModalType,
    closeModal,
}) => {
    const existingTrainsFromCellDataInitial = trains.map((elem) => ({
        name: elem.name.toLocaleLowerCase(),
        isImplemented: elem.isImplementation,
    }));

    const [existingTrainingsFromCellData, setExistingTrainingsFromCellData] = useState(
        existingTrainsFromCellDataInitial,
    );

    useLayoutEffect(() => {
        setExistingTrainingsFromCellData(
            trains.map((elem) => ({
                name: elem.name.toLocaleLowerCase(),
                isImplemented: elem.isImplementation,
            })),
        );
    }, [trains]);

    const { allowedTrains, editedTrainName } = useContext(DrawerTrainsContext);

    const allowedTrainingsForCellCorrected = getAllowedTrains(
        existingTrainingsFromCellData,
        allowedTrains,
    );

    const existingTrainingsForCell = getExistedNotImplementedTrains(
        existingTrainingsFromCellData,
        allowedTrains,
    );

    const topPosition = isCentered
        ? modalPosition.top + modalPosition.heightSelectedCell
        : modalPosition.top;

    const styleForCenteredPosition = {
        width: widthModal,
        top: topPosition,
        left: 24,
        zIndex: 11,
    };

    const styleForOtherPosition =
        checkNarrowFramesDay(value.day()).side === 'left'
            ? {
                  width: widthModal,
                  top: topPosition,
                  left: modalPosition.left,
                  zIndex: 11,
              }
            : {
                  width: widthModal,
                  top: topPosition,
                  right: modalPosition.right,
                  zIndex: 11,
              };

    return (
        <>
            {modalType === 'train' && (
                <div
                    data-test-id='modal-create-training'
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    <ModalCreateTrain
                        value={value}
                        trains={trains}
                        closeModal={closeModal}
                        changeMode={changeModalType}
                    />
                </div>
            )}
            {modalType === 'exercise' && (
                <div
                    data-test-id='modal-create-exercise'
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    <ModalSelectExercise
                        date={value}
                        allowedTrains={allowedTrainingsForCellCorrected}
                        existingTrains={existingTrainingsForCell}
                        changeMode={changeModalType}
                        trainForEdit={editedTrainName}
                        trains={trains}
                        closeModal={closeModal}
                    />
                </div>
            )}
        </>
    );
};
