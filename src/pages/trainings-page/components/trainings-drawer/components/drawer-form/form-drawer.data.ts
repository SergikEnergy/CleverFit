import { FormFieldsType, FormFieldType } from './form-drawer.types';

export const emptyFields: FormFieldType = {
    key: 'empty',
    name: 'empty',
    exercise: '',
    replays: 1,
    weight: 0,
    approaches: 1,
};

export const initialEmptyFormFields: FormFieldsType = {
    exercises: [
        {
            key: 'empty',
            name: 'empty',
            exercise: '',
            replays: 1,
            weight: 0,
            approaches: 1,
        },
    ],
};

export const selectPeriodOptions: Array<{ value: number; label: string }> = [
    {
        value: 1,
        label: 'Через 1 день',
    },
    {
        value: 2,
        label: 'Через 2 дня',
    },
    {
        value: 3,
        label: 'Через 3 дня',
    },
    {
        value: 0,
        label: 'День недели',
    },
];

export const selectDayOfWeekOptions: Array<{ value: number; label: string }> = [
    {
        value: 1,
        label: 'Понедельник',
    },
    {
        value: 2,
        label: 'Вторник',
    },
    {
        value: 3,
        label: 'Среда',
    },
    {
        value: 4,
        label: 'Четверг',
    },
    {
        value: 5,
        label: 'Пятница',
    },
    {
        value: 6,
        label: 'Суббота',
    },
    {
        value: 0,
        label: 'Воскресенье',
    },
];
