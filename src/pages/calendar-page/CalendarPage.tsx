import { FC, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useLazyGetAllTrainingsQuery,
    useLazyGetAllowedTrainsListQuery,
} from '@redux/API/calendarAPI';
import { ModalReportContext } from '../../reactContexts/modalReport-context';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { Paths } from '../../routes/pathes';
import { BasePagesLayout } from '@pages/basePagesLayout';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { resetCredentials } from '@redux/reducers/authSlice';
import { ShowFetchDataError } from '@components/showFetchDataError';
import { ErrorShowAllowedTrainsList } from '@components/errorShowAllowedTrainsList';

import classes from './CalendarPage.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const [
        getAllTrainings,
        {
            data: userTrainsData,
            error: errorGetAllTrains,
            isError: isGettingTrainsError,
            isLoading: isFetchingAllTrains,
        },
    ] = useLazyGetAllTrainingsQuery();

    const [
        getAllowedTrainsList,
        {
            data: allowedTrainsList,
            error: getAllowedTrainsError,
            isError: isGettingAllowedTrainsError,
            isLoading: isFetchingAllowedTrains,
        },
    ] = useLazyGetAllowedTrainsListQuery();

    const handlerToErrorCloseAction = () => {
        setNode(null);
        closeModal();
    };

    const refetchAllowedTrainsList = () => {
        setNode(null);
        closeModal();
        fetchAllowedTrainsList().finally(() => {
            stopLoader();
        });
    };

    const resetUser = () => {
        localStorage.removeItem('userCleverFit');
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    const fetchAllTrainings = async () => {
        try {
            await getAllTrainings();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    navigate(Paths.MAIN_PAGE, { replace: true });
                    setNode(<ShowFetchDataError forPage='calendar' />);
                    setWidthModal('clamp(328px, 100%, 539px)');
                    openModal();
                }
            }
        } finally {
            stopLoader();
        }
    };

    const fetchAllowedTrainsList = async () => {
        try {
            await getAllowedTrainsList();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    setNode(
                        <ErrorShowAllowedTrainsList
                            status='info'
                            buttonActionClick={refetchAllowedTrainsList}
                            closeClickAction={handlerToErrorCloseAction}
                        />,
                    );
                    setWidthModal('clamp(328px, 100%, 384px)');
                    openModal();
                }
            }
        } finally {
            stopLoader();
        }
    };

    useEffect(() => {
        if (isFetchingAllTrains || isFetchingAllowedTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllTrains, isFetchingAllowedTrains]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        if (location.state.allowRequest) {
            console.log('from main-page allow request');
            fetchAllTrainings().then(() => {
                fetchAllowedTrainsList();
            });
        }
    }, [
        errorGetAllTrains,
        isGettingTrainsError,
        isGettingAllowedTrainsError,
        getAllowedTrainsError,
    ]);

    return <BasePagesLayout isCalendarPage={true}>calendar-page</BasePagesLayout>;
};