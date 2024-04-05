export const setPeriodToString = (period: number | undefined | null) => {
    if (period && period === 7) {
        return '1 раз в неделю';
    }
    if ((period && period === 1) || period === 6 || period === 5) {
        return `${period} раз в неделю`;
    }
    if (!period) {
        return '';
    }

    return `${period} раза в неделю`;
};
