import { UploadFile } from 'antd';

export type FieldType = {
    email: string;
    firstName?: string;
    uploadFile?: UploadFile;
    lastName?: string;
    birthday?: string;
    password?: string;
    passwordConfirm?: string;
};
