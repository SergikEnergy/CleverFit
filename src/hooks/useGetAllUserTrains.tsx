import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../routes/pathes';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { setUserTrainsFromServer, resetUserTrainsFromServer } from '@redux/reducers/calendarSlice';
import { LoaderStateContext } from '../reactContexts/loader-context';
import { ModalReportContext } from '../reactContexts/modalReport-context';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { useAppDispatch } from '.';
import { resetCredentials } from '@redux/reducers/authSlice';
import { useLazyGetAllTrainingsQuery } from '@redux/API/calendarAPI';
import { ShowFetchDataError } from '@components/showFetchDataError';

export const useGetAllUserTrains = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    const [getAllTrainings, { isLoading: isFetchingAllTrains }] = useLazyGetAllTrainingsQuery();

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

    const fetchAllTrainings = async () => {
        try {
            const trains = await getAllTrainings();
            if (trains.data) {
                dispatch(setUserTrainsFromServer(trains.data));
            }
        } catch (error) {
            dispatch(resetUserTrainsFromServer());
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    setNode(<ShowFetchDataError forPage='calendar' />);
                    setWidthModal('clamp(328px, 100%, 539px)');
                    openModal();
                }
            }
        } finally {
            stopLoader();
        }
    };
    return fetchAllTrainings;
};
