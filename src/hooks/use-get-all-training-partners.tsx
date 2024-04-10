import { useCallback, useEffect } from 'react';
import { useLazyGetAllTrainingsPartnersQuery } from '@redux/api/trainings-api';

import { useLoaderContext } from '../react-contexts';

export const useGetAllTrainingPartners = () => {
    const { startLoader, stopLoader } = useLoaderContext();

    const [getAllTrainingPartners, { isLoading }] = useLazyGetAllTrainingsPartnersQuery();

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

    const handleGetTrainingsError = (error: unknown) => {
        console.log(error);
    };

    const fetchUserTrainingPartners = useCallback(async () => {
        try {
            await getAllTrainingPartners().unwrap();
            stopLoader();
        } catch (error) {
            handleGetTrainingsError(error);
            stopLoader();
        }
    }, [getAllTrainingPartners, stopLoader]);

    return fetchUserTrainingPartners;
};
