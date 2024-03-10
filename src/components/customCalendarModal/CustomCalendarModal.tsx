import { FC } from 'react';
import { Moment } from 'moment';
import { checkNarrowFramesDay } from './CustomCalendarModal.utils';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData';

import classes from './CustomCalendarModal.module.css';
import classnames from 'classnames';

interface ICustomCalendarModalProps {
    widthModal: string;
    height: string;
    modalPosition: IModalPosition;
    value: Moment;
    isCentered?: boolean;
    allowOpen: boolean;
    isModalVisible: boolean;
}

export const CustomCalendarModal: FC<ICustomCalendarModalProps> = ({
    allowOpen,
    modalPosition,
    value,
    widthModal,
    height,
    isCentered,
    isModalVisible,
}) => {
    const topPosition = modalPosition.top;
    const styleForCenteredPosition = {
        width: widthModal,
        height,
        top: `${topPosition}px`,
        left: 0,
        right: 0,
    };
    const styleForOtherPosition =
        checkNarrowFramesDay(value.day()).side === 'left'
            ? {
                  width: widthModal,
                  height,
                  top: `${topPosition}px`,
                  left: `${modalPosition.left}px`,
              }
            : {
                  width: widthModal,
                  height,
                  top: `${topPosition}px`,
                  right: `${modalPosition.right}px`,
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
                    Modal
                </div>
            )}
        </>
    );
};
