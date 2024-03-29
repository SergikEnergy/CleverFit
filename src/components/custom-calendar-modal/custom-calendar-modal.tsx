import { FC, Fragment, useContext, useLayoutEffect, useState } from 'react';
import { EXERCISE_MODE, TRAIN_MODE } from '@utils/constants/train-modes';
import classnames from 'classnames';

import { DrawerTrainsContext } from '../../react-contexts';

import { ModalCreateTrain, ModalSelectExercise } from './components';
import { CustomCalendarModalPropsType } from './custom-calendar-modal.types';
import {
    checkNarrowFramesDay,
    getAllowedTrains,
    getExistedNotImplementedTrains,
} from './custom-calendar-modal.utils';

import classes from './custom-calendar-modal.module.css';

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
        <Fragment>
            {modalType === TRAIN_MODE && (
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
            {modalType === EXERCISE_MODE && (
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
        </Fragment>
    );
};
