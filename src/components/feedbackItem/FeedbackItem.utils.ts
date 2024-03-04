export const getFormattedDate = (string: string): string => {
    const date = new Date(string);
    const days = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const months = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
    const years = `${date.getFullYear()}`;

    return `${days}.${months}.${years}`;
};
