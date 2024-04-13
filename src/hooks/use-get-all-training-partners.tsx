import { useCallback } from 'react';
import { useLazyGetAllTrainingsPartnersQuery } from '@redux/api/trainings-api';

import { useLoaderContext } from '../react-contexts';

export const useGetAllTrainingPartners = () => {
    const { startLoader, stopLoader } = useLoaderContext();

    const [getAllTrainingPartners] = useLazyGetAllTrainingsPartnersQuery();

    const handleGetTrainingsError = (error: unknown) => {
        console.log(error);
    };

    const fetchUserTrainingPartners = useCallback(async () => {
        try {
            startLoader();
            await getAllTrainingPartners().unwrap();
            stopLoader();
        } catch (error) {
            stopLoader();
            handleGetTrainingsError(error);
        }
    }, [getAllTrainingPartners, startLoader, stopLoader]);

    return fetchUserTrainingPartners;
};
