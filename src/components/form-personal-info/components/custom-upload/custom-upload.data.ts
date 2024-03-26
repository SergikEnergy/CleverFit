import type { UploadFile,UploadListProgressProps } from 'antd/es/upload/interface';

export const errorFile: UploadFile = {
    uid: 'error-image-pmg',
    name: 'image.png',
    status: 'error',
};

export const loaderProgressStyle:UploadListProgressProps = {
    strokeColor: 'blue',
    strokeWidth: 4,
    showInfo: false,
};
