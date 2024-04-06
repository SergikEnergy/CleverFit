import { useCallback, useEffect } from 'react';
import { ErrorShowPartners } from '@components/error-trainings-page';
import { QueryPartnersTrainingType } from '@redux/api/api-types';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useLazyGetAllSimilarPartnersQuery } from '@redux/api/trainings-api';
import { setSimilarPartners } from '@redux/reducers/trainings-partners-slice';

import { useLoaderContext, useModalReportContext } from '../react-contexts';

import { useAppDispatch } from '.';

export const useGetSimilarPartners = () => {
    const dispatch = useAppDispatch();
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal, closeModal } = useModalReportContext();

    const closeErrorModal = useCallback(() => {
        closeModal();
        setNode(null);
    }, [closeModal, setNode]);

    const [getAllSimilarPartners, { isLoading }] = useLazyGetAllSimilarPartnersQuery();

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    const handleGetTrainingsError = useCallback(
        (error: unknown) => {
            if (isFetchBaseQueryError(error)) {
                setNode(<ErrorShowPartners status='error' closeClickAction={closeErrorModal} />);
                setWidthModal('clamp(328px, 100%, 384px)');
                openModal();
            }
        },
        [closeErrorModal, openModal, setNode, setWidthModal],
    );

    const fetchSimilarPartners = useCallback(
        async (trainingType: QueryPartnersTrainingType) => {
            try {
                const similarPartners = await getAllSimilarPartners(trainingType).unwrap();

                if (similarPartners) {
                    dispatch(setSimilarPartners(similarPartners));
                }
                stopLoader();

                return true;
            } catch (error) {
                handleGetTrainingsError(error);
                stopLoader();

                return false;
            }
        },
        [dispatch, getAllSimilarPartners, handleGetTrainingsError, stopLoader],
    );

    return fetchSimilarPartners;
};
