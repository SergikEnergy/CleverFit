export const getParamFromStorage = (
    param: string,
    key: string,
    notFoundFormat: string | null,
): string | null => {
    const itemInLocalStorage = localStorage.getItem(param);
    const itemInSessionStorage = sessionStorage.getItem(param);

    if (itemInLocalStorage) {
        const objFromLocalStorage = JSON.parse(itemInLocalStorage);

        if (key in objFromLocalStorage) {
            return objFromLocalStorage[key];
        }
    } else if (itemInSessionStorage) {
        const objFromSessionStorage = JSON.parse(itemInSessionStorage);

        if (key in objFromSessionStorage) {
            return objFromSessionStorage[key];
        }
    }

    return notFoundFormat === null ? null : '';
};
