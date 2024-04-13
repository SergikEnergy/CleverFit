import { useCallback } from 'react';
import { ErrorShowPartners } from '@components/error-trainings-page';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useLazyGetAllRandomPartnersQuery } from '@redux/api/trainings-api';
import { setRandomPartners } from '@redux/reducers/trainings-partners-slice';

import { useLoaderContext, useModalReportContext } from '../react-contexts';

import { useAppDispatch } from '.';

export const useGetRandomPartners = () => {
    const dispatch = useAppDispatch();
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal, closeModal } = useModalReportContext();

    const closeErrorModal = useCallback(() => {
        closeModal();
        setNode(null);
    }, [closeModal, setNode]);

    const [getAllRandomPartners] = useLazyGetAllRandomPartnersQuery();

    const handleGetTrainingsError = useCallback(
        (error: unknown) => {
            if (isFetchBaseQueryError(error)) {
                setNode(
                    <ErrorShowPartners
                        status='error'
                        closeClickAction={closeErrorModal}
                        random={true}
                    />,
                );
                setWidthModal('clamp(328px, 100%, 384px)');
                openModal();
            }
        },
        [closeErrorModal, openModal, setNode, setWidthModal],
    );

    const fetchRandomPartners = useCallback(async () => {
        try {
            startLoader();
            const randomPartners = await getAllRandomPartners().unwrap();

            stopLoader();
            dispatch(setRandomPartners(randomPartners));

            return true;
        } catch (error) {
            stopLoader();
            handleGetTrainingsError(error);

            return false;
        }
    }, [dispatch, getAllRandomPartners, handleGetTrainingsError, startLoader, stopLoader]);

    return fetchRandomPartners;
};
