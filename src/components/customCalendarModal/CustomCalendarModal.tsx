import { FC, useContext } from 'react';
import { Moment } from 'moment';
import { checkNarrowFramesDay } from './CustomCalendarModal.utils';
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
    const { allowedTrains, editedTrainName } = useContext(DrawerTrainsContext);

    const existingTrainsFromCellData = trains.map((elem) => elem.name.toLocaleLowerCase());

    const allowedTrainsForCellCorrected =
        allowedTrains.length > 0
            ? allowedTrains.filter((elem) =>
                  !existingTrainsFromCellData.includes(elem.name.toLowerCase()) ? true : false,
              )
            : [];

    const disableCreateButton =
        allowedTrainsForCellCorrected.length === 0 || value.isSameOrBefore(moment());

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
