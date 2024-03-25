import { FC, Fragment, useContext, useState } from 'react';
import { ErrorWrongImgSize } from '@components/wrong-img-file';
import { useAppSelector, useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { API_IMGS_BASE, API_BASE_URL } from '@redux/api/api-data';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setUploadProgress } from '@redux/reducers/upload-progress-slice';
import { saveImgUploadData } from '@redux/reducers/personal-info-slice';

import { ModalReportContext } from '../../../../react-contexts';
import { NoAvatarButton } from '../no-avatar-button/no-avatar-button';

import { errorFile } from './custom-upload.data';
import { getBase64, getImageSrc, isSizeValid } from './custom-upload.utils';

import classes from './custom-upload.module.css';

type CustomUploadPropsType = {
    setDisabledSaveButton: (value: boolean) => void;
};

export const CustomUpload: FC<CustomUploadPropsType> = ({ setDisabledSaveButton }) => {
    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const { imgSrc: imageSrc, url: urlPreview } = useAppSelector((state) => state.personalInfo);
    const uploadProgress = useAppSelector((state) => state.uploadProgress.uploadProgress);
    const imageUrl = getImageSrc(imageSrc || '');
    const [fileList, setFileList] = useState<UploadFile[]>(
        imageSrc
            ? [
                  {
                      uid: '-1',
                      name: 'image.png',
                      status: 'done',
                      url: imageUrl,
                  },
              ]
            : [],
    );
    const [file, setFile] = useState<RcFile | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    console.log(uploadProgress);

    // TODOupload progress from dispatchstate

    const handleCancel = () => setPreviewOpen(false);

    const uploadPhoto = async (formBody: FormData) => {
        try {
            const config: AxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percent = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;

                    dispatch(setUploadProgress(percent));
                },
            };

            setUploading(true);
            const response: AxiosResponse = await axios.post(
                `${API_BASE_URL}upload-image`,
                formBody,
                config,
            );

            dispatch(saveImgUploadData(response.data));
        } catch (error) {
            // TODOshow error modal after
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    const handlePreview = async () => {
        if (!file) return;
        if (file) {
            const newFile: UploadFile = file;

            if (!newFile.url && !newFile.preview) {
                newFile.preview = await getBase64(file);
            }
            setPreviewOpen(true);
            setPreviewTitle(newFile.name || 'Noname.jpg');
            setPreviewImage(newFile.url || (newFile.preview as string));
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if (!newFileList || newFileList.length === 0) return;

        if (newFileList.length > 0) {
            const uploadedFile = newFileList[0].originFileObj;

            if (uploadedFile) {
                setFile(uploadedFile);
            } else {
                setFile(null);
                setPreviewImage('');
            }
        }
    };

    const customRequestHandler = async () => {
        if (!file) return;
        try {
            if (isSizeValid(file)) {
                setUploading(true);
                const formData = new FormData();

                formData.append('file', file);

                await uploadPhoto(formData);

                setPreviewImage(`${API_IMGS_BASE}${urlPreview}`);
            } else {
                setNode(<ErrorWrongImgSize disabledSubmit={setDisabledSaveButton} />);
                setWidthModal('clamp(328px, 100%, 416px)');
                openModal();
            }
        } catch (err) {
            setFileList([errorFile]);
            setFile(null);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Fragment>
            <Upload
                name='avatar'
                onPreview={handlePreview}
                listType='picture-card'
                maxCount={1}
                className={classes.upload}
                customRequest={customRequestHandler}
                showUploadList={false}
                accept='image/*'
                onChange={handleChange}
                fileList={fileList}
            >
                {!imageUrl ? (
                    <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
                ) : (
                    <NoAvatarButton />
                )}
            </Upload>
            <Modal
                open={previewOpen}
                title={previewTitle}
                maskClosable={true}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </Fragment>
    );
};
