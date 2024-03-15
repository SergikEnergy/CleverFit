import { FC, useContext } from 'react';
import { Moment } from 'moment';
import {
    checkNarrowFramesDay,
    getAllowedTrains,
    getExistedNotImplementedTrains,
} from './CustomCalendarModal.utils';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData.types';
import { ITrainingsResponse } from '@redux/API/api-types';
import { ModalCreateTrain, ModalSelectExercise } from './components';
import { DrawerTrainsContext } from '../../reactContexts/drawerTrains-context';
import moment from 'moment';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

export type ModalModeType = 'train' | 'exercise';

interface ICustomCalendarModalProps {
    widthModal: string;
    modalType: ModalModeType;
    modalPosition: IModalPosition;
    value: Moment;
    trains: [] | ITrainingsResponse[];
    isCentered?: boolean;
    allowOpen: boolean;
    isModalVisible: boolean;
    closeModal: () => void;
    changeModalType: () => void;
}

export const CustomCalendarModal: FC<ICustomCalendarModalProps> = ({
    allowOpen,
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
    const isPastDate = value.isSameOrBefore(moment());
    const { allowedTrains, editedTrainName } = useContext(DrawerTrainsContext);

    const existingTrainsFromCellData = trains.map((elem) => ({
        name: elem.name.toLocaleLowerCase(),
        isImplemented: elem.isImplementation,
    }));

    const allowedTrainsForCellCorrected = getAllowedTrains(
        existingTrainsFromCellData,
        allowedTrains,
    );

    const existingTrainsForCell = getExistedNotImplementedTrains(
        existingTrainsFromCellData,
        allowedTrains,
    );

    const disableCreateButton = allowedTrainsForCellCorrected.length === 0 || isPastDate;

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
            {allowOpen && modalType === 'train' && (
                <div
                    data-test-id={
                        modalType === 'train' ? 'modal-create-training' : 'modal-create-exercise'
                    }
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    <ModalCreateTrain
                        disabledCreate={disableCreateButton}
                        value={value}
                        trains={trains}
                        closeModal={closeModal}
                        changeMode={changeModalType}
                    />
                </div>
            )}
            {allowOpen && modalType === 'exercise' && (
                <div
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    <ModalSelectExercise
                        date={value}
                        allowedTrains={allowedTrainsForCellCorrected}
                        existingTrains={existingTrainsForCell}
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
