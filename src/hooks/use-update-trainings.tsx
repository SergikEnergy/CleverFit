import { useCallback, useEffect } from 'react';
import { ErrorAddTrain } from '@components/error-add-train';
import { NewTrainRequestType } from '@redux/api/api-types';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useAddNewTrainMutation } from '@redux/api/trainings-api';

import { useLoaderContext, useModalReportContext } from '../react-contexts';

export const useUpdateTrainings = () => {
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal } = useModalReportContext();

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
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    handleErrorUpdateUser(error);
                    stopLoader();
                }
                stopLoader();
            }
        },
        [handleErrorUpdateUser, stopLoader, updateTrainings],
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
