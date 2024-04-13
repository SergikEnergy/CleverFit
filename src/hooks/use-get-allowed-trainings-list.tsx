import { useCallback } from 'react';
import { ErrorShowAllowedTrainsList } from '@components/error-show-allowed-trains-list';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useLazyGetAllowedTrainsListQuery } from '@redux/api/trainings-api';

import {
    useCalendarTrainingsDrawerContext,
    useLoaderContext,
    useModalReportContext,
} from '../react-contexts';

import { useResetUser } from './reset-user';

export const useGetAllowedTrainingsLists = () => {
    const resetUser = useResetUser();
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal, closeModal } = useModalReportContext();
    const { updateAllowedTrains } = useCalendarTrainingsDrawerContext();

    const handlerErrorCloseAction = useCallback(() => {
        setNode(null);
        closeModal();
    }, [closeModal, setNode]);

    const [getAllowedTrainingsList, { data: trainingsList, isLoading, isSuccess }] =
        useLazyGetAllowedTrainsListQuery();

    const handleErrorAllowedTrainings = useCallback(
        (error: unknown) => {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    setNode(
                        <ErrorShowAllowedTrainsList
                            status='info'
                            closeClickAction={handlerErrorCloseAction}
                        />,
                    );
                    setWidthModal('clamp(328px, 100%, 384px)');
                    openModal();
                }
            }
        },
        [handlerErrorCloseAction, openModal, resetUser, setNode, setWidthModal],
    );

    const fetchAllowedTrainingsList = useCallback(async () => {
        try {
            startLoader();
            const trainingsAllowed = await getAllowedTrainingsList().unwrap();

            stopLoader();
            updateAllowedTrains(trainingsAllowed);
        } catch (error) {
            stopLoader();
            if (isFetchBaseQueryError(error)) {
                handleErrorAllowedTrainings(error);
            }
        }
    }, [
        getAllowedTrainingsList,
        handleErrorAllowedTrainings,
        startLoader,
        stopLoader,
        updateAllowedTrains,
    ]);

    return { fetchAllowedTrainingsList, trainingsList, isLoading, isSuccessGettingList: isSuccess };
};
