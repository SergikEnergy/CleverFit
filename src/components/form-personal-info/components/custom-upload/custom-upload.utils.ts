import { API_IMGS_BASE } from '@redux/api/api-data';

const isStringURL = (string: string) => {
    const regEx = /^(ftp|http|https):\/\/[^ "]+$/;

    return regEx.test(string);
};

export const getImageSrc = (url: string) => {
    let imgSrc = '';

    if (isStringURL(url)) {
        imgSrc = url;
    } else if (url.length !== 0) {
        imgSrc = API_IMGS_BASE + url;
    }

    return imgSrc;
};
