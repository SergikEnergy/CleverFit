import { API_IMGS_BASE } from '@redux/api/api-data';
import { LIMIT_IMG_SIZE } from '@utils/constants/profile-data';
import { RcFile } from 'antd/es/upload';

export const isStringURL = (string: string) => {
    const regEx = /^(ftp|http|https):\/\/[^ "]+$/;

    return regEx.test(string);
};

export const isImage = (file: File) => file.type.startsWith('image/');

export const isSizeValid = (file: File) => file.size / 1024 / 1024 < LIMIT_IMG_SIZE;

export const getImageSrc = (url: string) => {
    let imgSrc = '';

    if (isStringURL(url)) {
        imgSrc = url;
    } else if (url.length !== 0) {
        imgSrc = API_IMGS_BASE + url;
    }

    return imgSrc;
};

export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
