import { UploadFile } from 'antd';

export type FormPersonalInfoPropsType = {
    //
};

export type FieldType = {
    userName?: string;
    uploadFile?: UploadFile;
    userLastName?: string;
    userBirthDate?: string;
    userImg?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
};
