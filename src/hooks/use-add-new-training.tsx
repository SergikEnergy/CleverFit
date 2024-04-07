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

export const useAddNewTraining = () => {
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal } = useModalReportContext();
    const { changeStatus } = useTrainingsDrawerContext();

    const [addNewTraining, { isLoading }] = useAddNewTrainMutation();

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

    const addNewUserTraining = useCallback(
        async (body: NewTrainRequestType) => {
            try {
                const result = await addNewTraining(body).unwrap();

                changeStatus(SUBMIT_TRAIN_SUCCESS);

                return result;
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    handleErrorUpdateUser(error);
                    stopLoader();
                }
                stopLoader();
                changeStatus(SUBMIT_TRAIN_ERROR);

                return null;
            }
        },
        [addNewTraining, changeStatus, handleErrorUpdateUser, stopLoader],
    );

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    return addNewUserTraining;
};
