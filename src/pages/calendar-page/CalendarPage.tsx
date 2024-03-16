import { FC, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@components/calendarDrawer';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { useLazyGetAllowedTrainsListQuery } from '@redux/API/calendarAPI';
import { ModalReportContext, LoaderStateContext, DrawerTrainsContext } from '../../reactContexts';
import { Paths } from '../../routes/pathes';
import { BasePagesLayout } from '@pages/basePagesLayout';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { resetCredentials } from '@redux/reducers/authSlice';
import { CalenDarWithData } from '@components/calendarWithData';
import { ErrorShowAllowedTrainsList } from '@components/errorShowAllowedTrainsList';

import classes from './CalendarPage.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const isGettingTrainSuccessful = useAppSelector(
        (state) => state.calendar.isGetTrainsSuccessful,
    );
    const userTrainingsData = useAppSelector((state) => state.calendar.userTrains);
    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { updateAllowedTrains } = useContext(DrawerTrainsContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

    const [
        getAllowedTrainingsList,
        { data: allowedTrainsList, isLoading: isFetchingAllowedTrains },
    ] = useLazyGetAllowedTrainsListQuery();

    const handlerErrorCloseAction = () => {
        setNode(null);
        closeModal();
    };

    const refetchAllowedTrainingsList = () => {
        setNode(null);
        closeModal();
        fetchAllowedTrainingsList();
    };

    const resetUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    const handleErrorAllowedTrainings = (error: unknown) => {
        if (isFetchBaseQueryError(error)) {
            if (error.status === 403) {
                resetUser();
            } else {
                setNode(
                    <ErrorShowAllowedTrainsList
                        status='info'
                        buttonActionClick={refetchAllowedTrainingsList}
                        closeClickAction={handlerErrorCloseAction}
                    />,
                );
                setWidthModal('clamp(328px, 100%, 384px)');
                openModal();
            }
        }
    };

    const fetchAllowedTrainingsList = async () => {
        try {
            const trainingsAllowed = await getAllowedTrainingsList();
            if (Array.isArray(trainingsAllowed.data)) {
                updateAllowedTrains(trainingsAllowed.data);
            } else if (isFetchBaseQueryError(trainingsAllowed)) {
                handleErrorAllowedTrainings(trainingsAllowed);
            }
        } catch (error) {
            handleErrorAllowedTrainings(error);
        } finally {
            stopLoader();
        }
    };

    useEffect(() => {
        if (location.state.allowRequest) {
            if (isGettingTrainSuccessful) {
                fetchAllowedTrainingsList();
            }
        }
    }, [userTrainingsData, isGettingTrainSuccessful]);

    useEffect(() => {
        if (isFetchingAllowedTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllowedTrains]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);
    console.log('allowedList', allowedTrainsList);

    return (
        <>
            <BasePagesLayout isCalendarPage>
                <div className={classes.wrapper} id={'modalWrapperCalendar'}>
                    <CalenDarWithData
                        dataForRender={
                            userTrainingsData && allowedTrainsList ? userTrainingsData : []
                        }
                        allowedTrainsList={allowedTrainsList ? allowedTrainsList : []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </>
    );
};
