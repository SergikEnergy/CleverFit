import { FC } from 'react';
import { Moment } from 'moment';
import { checkNarrowFramesDay } from './CustomCalendarModal.utils';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData';
import { ITrainingsResponse } from '@redux/API/api-types';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

interface ICustomCalendarModalProps {
    widthModal: string;
    modalPosition: IModalPosition;
    value: Moment;
    trains: [] | ITrainingsResponse[];
    isCentered?: boolean;
    allowOpen: boolean;
    isModalVisible: boolean;
}

export const CustomCalendarModal: FC<ICustomCalendarModalProps> = ({
    allowOpen,
    modalPosition,
    value,
    widthModal,
    isCentered,
    isModalVisible,
    trains,
}) => {
    const topPosition = modalPosition.top;
    const styleForCenteredPosition = {
        width: widthModal,
        top: `${topPosition}px`,
        left: 0,
        right: 0,
        zIndex: 11,
    };
    const styleForOtherPosition =
        checkNarrowFramesDay(value.day()).side === 'left'
            ? {
                  width: widthModal,
                  top: `${topPosition}px`,
                  left: `${modalPosition.left}px`,
                  zIndex: 11,
              }
            : {
                  width: widthModal,
                  top: `${topPosition}px`,
                  right: `${modalPosition.right}px`,
                  zIndex: 11,
              };

    return (
        <>
            {allowOpen && (
                <div
                    style={
                        isCentered ? { ...styleForCenteredPosition } : { ...styleForOtherPosition }
                    }
                    className={classnames(classes.modal, { [classes.hidden]: !isModalVisible })}
                >
                    {trains.length > 0 ? 'here is a train' : 'without data'}
                </div>
            )}
        </>
    );
};
