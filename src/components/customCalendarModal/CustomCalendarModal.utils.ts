import { Moment } from 'moment';
import { IModalPosition } from '@components/calendarWithData/CalendarWithData.types';

export const checkNarrowFramesDay = (day: number) => {
    if (day === 0 || day === 6) {
        return { side: 'right' };
    } else {
        return { side: 'left' };
    }
};

export const getStateForModalPosition = (
    isCentered: boolean,
    modalPosition: IModalPosition,
    leftCalendar: number,
    widthModal: string,
    value: Moment,
) => {
    const topPosition = isCentered
        ? modalPosition.top + modalPosition.heightSelectedCell
        : modalPosition.top;

    const styleForCenteredPosition = {
        width: widthModal,
        top: `${topPosition}px`,
        left: leftCalendar,
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
    console.log(isCentered ? styleForCenteredPosition : styleForOtherPosition);
    return isCentered ? styleForCenteredPosition : styleForOtherPosition;
};
