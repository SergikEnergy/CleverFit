import { dateFullFormatWithDash } from '@utils/constants/date-formats';
import moment, { Moment } from 'moment';

import { isCurrentMonth } from '../calendar-with-data.utils';

import { HandleDateClickFuncType } from './data-for-cells.types';

export const getModalDimensions = (
    selectedDay: Moment,
    setSelectedDay: (day: Moment) => void,
    setDay = false,
    idByClick?: string,
) => {
    const id = idByClick || selectedDay.format(dateFullFormatWithDash);
    const selectedCell = document.querySelector(`td[title="${id}"]`);
    const modalParent = document.querySelector('#modalWrapperCalendar');

    if (selectedCell && modalParent) {
        if (setDay) {
            setSelectedDay(moment(id, dateFullFormatWithDash));
        }

        const {
            top: topModal,
            left: leftModal,
            right: rightModal,
            width,
            height: heightSelectedCell,
        } = selectedCell.getBoundingClientRect();
        const {
            top: topParent,
            left: leftParent,
            right: rightParent,
        } = modalParent.getBoundingClientRect();

        return {
            topModal,
            topParent,
            leftModal,
            leftParent,
            rightModal,
            rightParent,
            width,
            heightSelectedCell,
        };
    }

    return undefined;
};

export const dateClickHandlerHelper: HandleDateClickFuncType = async (
    currentData,
    event,
    isFullScreen,
    hideCollapsed,
    resetExercises,
    setModalType,
    changeEditedTrainData,
    setIsModalVisible,
    setSelectedDay,
    selectedDay,
    setSelectedCellData,
    setModalPosition,
) => {
    if (!isFullScreen) {
        hideCollapsed();
    }
    resetExercises();
    changeEditedTrainData('', '');
    setModalType('train');
    const { id } = event.currentTarget;

    if (isFullScreen || (!isFullScreen && isCurrentMonth(id))) {
        event.stopPropagation();
        setIsModalVisible(false);

        const modalSizes = getModalDimensions(selectedDay, setSelectedDay, true, id);

        if (modalSizes) {
            setSelectedCellData(currentData);
            setModalPosition({
                top: modalSizes.topModal - modalSizes.topParent,
                left: modalSizes.leftModal - modalSizes.leftParent,
                right: modalSizes.rightParent - modalSizes.rightModal,
                width: modalSizes.width,
                heightSelectedCell: modalSizes.heightSelectedCell,
            });
            setTimeout(() => {
                setIsModalVisible(true);
            }, 0);
        }
    } else {
        setIsModalVisible(false);
    }
};
