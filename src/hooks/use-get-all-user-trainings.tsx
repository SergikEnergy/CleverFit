import { useContext, useEffect } from 'react';
import { ShowFetchDataError } from '@components/show-fetch-data-error';
import { useLazyGetAllTrainingsQuery } from '@redux/api/calendar-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';

import { LoaderStateContext, ModalReportContext } from '../react-contexts';

import { useResetUser } from './reset-user';

export const useGetAllUserTrainings = () => {
    const resetUser = useResetUser();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    const [getAllTrainings, { isLoading }] = useLazyGetAllTrainingsQuery();

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    const handleGetTrainingsError = (error: unknown) => {
        if (isFetchBaseQueryError(error) && error.status === 403) {
            resetUser();
        } else {
            setNode(<ShowFetchDataError forPage='calendar' />);
            setWidthModal('clamp(328px, 100%, 539px)');
            openModal();
        }
    };

    const fetchAllTrainings = async () => {
        try {
            await getAllTrainings().unwrap();
        } catch (error) {
            handleGetTrainingsError(error);
        } finally {
            stopLoader();
        }
    };

    return fetchAllTrainings;
};
