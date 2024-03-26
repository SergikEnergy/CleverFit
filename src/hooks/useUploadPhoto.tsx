/* eslint-disable unicorn/filename-case */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorWrongImgSize } from '@components/wrong-img-file';
import { API_BASE_URL, LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { resetCredentials } from '@redux/reducers/auth-slice';
import { saveImgUploadData } from '@redux/reducers/personal-info-slice';
import { setUploadProgress } from '@redux/reducers/upload-progress-slice';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ModalReportContext } from '../react-contexts';
import { ImageUpdateResponseType } from '../redux/api/api-types';
import { Paths } from '../routes/pathes';

import { useAppDispatch, useAppSelector } from '.';

export const useUploadPhoto = () => {
    const { openModal, setNode, setWidthModal } = useContext(ModalReportContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const [uploading, setUploading] = useState(false);

    const resetUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    const handleUploadError = (axiosError: AxiosError) => {
        if (axiosError.response?.status === 403) {
            resetUser();
        } else if (axiosError.response?.status === 409) {
            setNode(<ErrorWrongImgSize />);
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
