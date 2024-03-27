import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { ErrorProfile } from '@components/error-profile-page';
import { WRONG_SIZE_IMG } from '@components/error-profile-page/error-messages.data';
import { FieldType } from '@components/form-personal-info/form-personal-info.types';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { API_BASE_URL, API_IMGS_BASE } from '@redux/api/api-data';
import { resetImgUploadData, saveImgUploadData } from '@redux/reducers/personal-info-slice';
import { Form, Modal, Upload } from 'antd';
import type { UploadChangeParam, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

import { DATA_TEST_ID } from '../../../../data/data-test-ids';
import { ModalReportContext } from '../../../../react-contexts';
import { NoAvatarButton } from '../no-avatar-button/no-avatar-button';

import { errorFile, loaderProgressStyle } from './custom-upload.data';

import classes from './custom-upload.module.css';

type CustomUploadPropsType = {
    setDisabledSaveButton: (value: boolean) => void;
    setUploadStatus: (status: 'error' | 'done') => void;
};

export const CustomUpload: FC<CustomUploadPropsType> = ({
    setDisabledSaveButton,
    setUploadStatus,
}) => {
    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);
    const { imgSrc: imageSrc } = useAppSelector((state) => state.personalInfo);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        if (imageSrc)
            setFileList([
                {
                    uid: '-1',
                    name: imageSrc.split('/').slice(-1)[0],
                    status: 'done',
                    url: imageSrc,
                },
            ]);
    }, [imageSrc]);

    const handleCancel = () => setPreviewOpen(false);

    const handleRemove = () => {
        dispatch(resetImgUploadData());
        setFileList([]);
    };

    const handlePreview = () => {
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({
        file,
        fileList: newFileList,
    }: UploadChangeParam<UploadFile>) => {
        if (file?.error || file.status === 'error') {
            setNode(
                <ErrorProfile
                    title={WRONG_SIZE_IMG.title}
                    subTitle={WRONG_SIZE_IMG.subTitle}
                    buttonKey={WRONG_SIZE_IMG.buttonKey}
                    buttonText={WRONG_SIZE_IMG.buttonText}
                    dataTestIdBtn={DATA_TEST_ID.bigFileErrorClose}
                />,
            );
            setWidthModal('clamp(328px, 100%, 416px)');
            openModal();

            setPreviewImage('');
            setFileList([{ ...errorFile, name: file.name }]);
            setDisabledSaveButton(true);
            setUploadStatus('error');
        } else if (file && file.status !== 'removed') {
            setFileList(newFileList);
            setPreviewTitle(newFileList[0].name || 'Noname.jpg');

            if (file.response?.url) {
                setUploadStatus('done');
                setPreviewImage(`${API_IMGS_BASE}${file.response.url}`);
                saveImgUploadData({ url: file.response.url, name: file.response.name });
                setDisabledSaveButton(false);
            }
        }
    };

    return (
        <Fragment>
            <Form.Item<FieldType>
                name='uploadFile'
                className={classes.upload__item}
                data-test-id={DATA_TEST_ID.profileAvatar}
            >
                <Upload
                    progress={loaderProgressStyle}
                    locale={{
                        uploading: 'Загрузка',
                    }}
                    headers={{
                        Authorization: `Bearer ${token}`,
                    }}
                    action={`${API_BASE_URL}upload-image`}
                    method='POST'
                    showUploadList={true}
                    onPreview={handlePreview}
                    listType={window.innerWidth >= 500 ? 'picture-card' : 'picture'}
                    maxCount={1}
                    className={classes.upload}
                    accept='image/*'
                    onChange={handleChange}
                    onRemove={handleRemove}
                    fileList={fileList}
                >
                    {fileList.length === 0 && <NoAvatarButton />}
                </Upload>
            </Form.Item>
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
