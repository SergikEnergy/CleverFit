import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../routes/pathes';
import { history } from '@redux/configure-store';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { LoaderStateContext, ModalReportContext } from '../reactContexts';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { useAppDispatch } from '.';
import { resetCredentials } from '@redux/reducers/authSlice';
import { useLazyGetAllTrainingsQuery } from '@redux/API/calendarAPI';
import { ShowFetchDataError } from '@components/showFetchDataError';

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
        isLoading ? startLoader() : stopLoader();
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
