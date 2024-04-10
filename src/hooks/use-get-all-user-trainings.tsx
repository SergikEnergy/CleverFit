import { useCallback, useEffect } from 'react';
import { ShowFetchDataError } from '@components/show-fetch-data-error';
import { PagesVariantsType } from '@components/show-fetch-data-error/show-fetch-data-error';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useLazyGetAllTrainingsQuery } from '@redux/api/trainings-api';

import { useLoaderContext, useModalReportContext } from '../react-contexts';

import { useResetUser } from './reset-user';

type GetAllUserTrainingsArgumentsType = PagesVariantsType | undefined;

export const useGetAllUserTrainings = (forPage: GetAllUserTrainingsArgumentsType = 'calendar') => {
    const resetUser = useResetUser();
    const { startLoader, stopLoader } = useLoaderContext();
    const { setNode, setWidthModal, openModal } = useModalReportContext();

    const [getAllTrainings, { isLoading }] = useLazyGetAllTrainingsQuery();

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    const handleGetTrainingsError = useCallback(
        (error: unknown) => {
            if (isFetchBaseQueryError(error) && error.status === 403) {
                resetUser();
            } else {
                setNode(<ShowFetchDataError forPage={forPage} />);
                setWidthModal('clamp(328px, 100%, 539px)');
                openModal();
            }
        },
        [forPage, openModal, resetUser, setNode, setWidthModal],
    );

    const fetchAllTrainings = useCallback(async () => {
        try {
            const userTrainings = await getAllTrainings().unwrap();

            return userTrainings;
        } catch (error) {
            handleGetTrainingsError(error);

            return null;
        } finally {
            stopLoader();
        }
    }, [getAllTrainings, handleGetTrainingsError, stopLoader]);

    return fetchAllTrainings;
};
