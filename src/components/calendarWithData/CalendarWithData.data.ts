import ru_RU from 'antd/lib/calendar/locale/ru_RU';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TimePickerLocale from 'antd/lib/time-picker/locale/ru_RU';

export const ruLocale = {
    lang: {
        ...ru_RU.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
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
        ],
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
    ...CalendarLocale,
};
