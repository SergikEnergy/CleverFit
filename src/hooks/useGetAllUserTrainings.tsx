/* eslint-disable unicorn/filename-case */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowFetchDataError } from '@components/show-fetch-data-error';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { useLazyGetAllTrainingsQuery } from '@redux/api/calendar-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { history } from '@redux/configure-store';
import { resetCredentials } from '@redux/reducers/auth-slice';

import { LoaderStateContext, ModalReportContext } from '../react-contexts';
import { Paths } from '../routes/pathes';

import { useAppDispatch } from '.';

export const useGetAllUserTrainings = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    const [getAllTrainings, { isLoading }] = useLazyGetAllTrainingsQuery();

    const resetUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

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
            history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
        } catch (error) {
            handleGetTrainingsError(error);
        } finally {
            stopLoader();
        }
    };

    return fetchAllTrainings;
};
