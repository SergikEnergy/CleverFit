import ru_RU from 'antd/lib/calendar/locale/ru_RU';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TimePickerLocale from 'antd/lib/time-picker/locale/ru_RU';
import { ModalPositionType } from './CalendarWithData.types';

export const shortMonthsRu = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
];

export const ruLocale = {
    lang: {
        ...ru_RU.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: shortMonthsRu,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
    ...CalendarLocale,
};

export enum ColorForTrain {
    legs = 'pink',
    hands = 'cyan',
    strength = 'yellow',
    back = 'orange',
    chest = 'green',
}

export const modalInitialPosition: ModalPositionType = {
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    heightSelectedCell: 0,
};
