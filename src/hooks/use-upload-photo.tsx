import { useState } from 'react';
import { ErrorProfile } from '@components/error-profile-page';
import { WRONG_SIZE_IMG } from '@components/error-profile-page/error-messages.data';
import { API_BASE_URL } from '@redux/api/api-data';
import { saveImgUploadData } from '@redux/reducers/personal-info-slice';
import { setUploadProgress } from '@redux/reducers/upload-progress-slice';
import { useAuthSelector } from '@redux/selectors';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { useModalReportContext } from '../react-contexts';
import { ImageUpdateResponseType } from '../redux/api/api-types';

import { useResetUser } from './reset-user';
import { useAppDispatch } from '.';

export const useUploadPhoto = () => {
    const resetUser = useResetUser();
    const { openModal, setNode, setWidthModal } = useModalReportContext();
    const dispatch = useAppDispatch();

    const { token } = useAuthSelector();
    const [uploading, setUploading] = useState(false);

    const handleUploadError = (axiosError: AxiosError) => {
        if (axiosError.response?.status === 403) {
            resetUser();
        } else if (axiosError.response?.status === 409) {
            setNode(
                <ErrorProfile
                    title={WRONG_SIZE_IMG.title}
                    subTitle={WRONG_SIZE_IMG.subTitle}
                    buttonKey={WRONG_SIZE_IMG.buttonKey}
                    buttonText={WRONG_SIZE_IMG.buttonText}
                />,
            );
            setWidthModal('clamp(328px, 100%, 416px)');
            openModal();
        }
    };

    const uploadPhoto = async (formBody: FormData) => {
        setUploading(true);
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

            const response: AxiosResponse = await axios.post<
                ImageUpdateResponseType,
                AxiosResponse<ImageUpdateResponseType, FormData>,
                FormData
            >(`${API_BASE_URL}upload-image`, formBody, config);

            dispatch(saveImgUploadData(response.data));

            return { response: response.data as ImageUpdateResponseType };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setUploading(false);
                dispatch(setUploadProgress(0));
                handleUploadError(error);

                return { error: error.response?.data, status: error.response?.status };
            }

            return { error: null };
        } finally {
            setUploading(false);
            dispatch(setUploadProgress(0));
        }
    };

    return { uploading, uploadPhoto };
};
