const periodTrainingsSelectValue: Array<{ value: number; label: string }> = [
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
        value: 4,
        label: 'Через 4 дня',
    },
    {
        value: 5,
        label: 'Через 5 дней',
    },
    {
        value: 6,
        label: 'Через 6 дней',
    },
    {
        value: 7,
        label: '1 раз в неделю',
    },
];

export const getPeriodByValue = (period: number) => {
    const filteredValue = periodTrainingsSelectValue.filter((elem) => elem.value === period);

    return filteredValue.length > 0 ? filteredValue[0].label : null;
};
