import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../routes/pathes';
import { history } from '@redux/configure-store';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { setUserTrainsFromServer, resetUserTrainsFromServer } from '@redux/reducers/calendarSlice';
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

    const [getAllTrainings, { data, isLoading: isFetchingAllTrains }] =
        useLazyGetAllTrainingsQuery();

    useEffect(() => {
        if (data && !isFetchBaseQueryError(data)) {
            dispatch(setUserTrainsFromServer(data));
        }
    }, [data]);

    const resetUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    useEffect(() => {
        if (isFetchingAllTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllTrains, startLoader, stopLoader]);

    const handleGetTrainingsError = (error: unknown) => {
        dispatch(resetUserTrainsFromServer());
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
            const trainings = await getAllTrainings();
            if (trainings.data) {
                dispatch(setUserTrainsFromServer(trainings.data));
                history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
            } else if (isFetchBaseQueryError(trainings)) {
                handleGetTrainingsError(trainings);
            }
        } catch (error) {
            handleGetTrainingsError(error);
        } finally {
            stopLoader();
        }
    };
    return fetchAllTrainings;
};
