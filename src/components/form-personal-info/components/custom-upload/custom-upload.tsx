import { FC, useContext } from 'react';
import { Upload } from 'antd';
import { ModalReportContext } from '../../../../react-contexts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getImageSrc } from './custom-upload.utils';
import { NoAvatarButton } from '../no-avatar-button/no-avatar-button';

import classes from './custom-upload.module.css';

type CustomUploadPropsType = {
    //
};

export const CustomUpload: FC<CustomUploadPropsType> = () => {
    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);
    const imageSrc = useAppSelector((state) => state.personalInfo.imgSrc);
    const imageUrl = getImageSrc(imageSrc || '');

    const beforeUploadHandler = () => {};

    const handleChange = () => {};

    return (
        <Upload
            name='avatar'
            listType='picture-card'
            maxCount={1}
            className={classes.upload}
            showUploadList={false}
            accept='image/*'
            beforeUpload={beforeUploadHandler}
            onChange={handleChange}
        >
            {!imageUrl ? (
                <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
            ) : (
                <NoAvatarButton />
            )}
        </Upload>
    );
};
