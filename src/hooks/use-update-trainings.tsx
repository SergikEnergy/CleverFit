import { useCallback, useEffect } from 'react';
import { ErrorAddTrain } from '@components/error-add-train';
import { NewTrainRequestType } from '@redux/api/api-types';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useAddNewTrainMutation } from '@redux/api/trainings-api';
import { SUBMIT_TRAIN_ERROR, SUBMIT_TRAIN_SUCCESS } from '@utils/constants/train-modes';

import {
    useLoaderContext,
    useModalReportContext,
    useTrainingsDrawerContext,
} from '../react-contexts';

export const useUpdateTrainings = () => {
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal } = useModalReportContext();
    const { changeStatus } = useTrainingsDrawerContext();

    const [updateTrainings, { isLoading }] = useAddNewTrainMutation();

    const handleErrorUpdateUser = useCallback(
        (error: unknown) => {
            if (isFetchBaseQueryError(error)) {
                setNode(<ErrorAddTrain />);
                setWidthModal('clamp(328px, 100%, 384px)');
                openModal();
            }
        },
        [openModal, setNode, setWidthModal],
    );

    const updateUserTrainings = useCallback(
        async (body: NewTrainRequestType) => {
            try {
                await updateTrainings(body).unwrap();
                changeStatus(SUBMIT_TRAIN_SUCCESS);
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    handleErrorUpdateUser(error);
                    stopLoader();
                }
                stopLoader();
                changeStatus(SUBMIT_TRAIN_ERROR);
            }
        },
        [changeStatus, handleErrorUpdateUser, stopLoader, updateTrainings],
    );

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    return updateUserTrainings;
};
