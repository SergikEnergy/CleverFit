export const checkNarrowFramesDay = (day: number) => {
    if (day === 0 || day === 6) {
        return { side: 'right' };
    } else {
        return { side: 'left' };
    }
};
