import { FC, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@components/calendarDrawer';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { useLazyGetAllowedTrainsListQuery } from '@redux/API/calendarAPI';
import { ModalReportContext } from '../../reactContexts/modalReport-context';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { DrawerTrainsContext } from '../../reactContexts/drawerTrains-context';
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
    const userTrainsData = useAppSelector((state) => state.calendar.userTrains);
    console.log(userTrainsData);
    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { updateAllowedTrains } = useContext(DrawerTrainsContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

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
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    const fetchAllowedTrainsList = async () => {
        try {
            const trainsAllowed = await getAllowedTrainsList();
            if (Array.isArray(trainsAllowed.data)) {
                updateAllowedTrains(trainsAllowed.data);
            }
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
        if (isFetchingAllowedTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllowedTrains, startLoader, stopLoader]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        if (location.state && location.state.allowRequest) {
            if (isGettingTrainSuccessful) {
                fetchAllowedTrainsList();
            }
        }
    }, [isGettingAllowedTrainsError, getAllowedTrainsError, isGettingTrainSuccessful]);

    return (
        <>
            <BasePagesLayout isCalendarPage>
                <div className={classes.wrapper} id={'modalWrapperCalendar'}>
                    <CalenDarWithData
                        dataForRender={userTrainsData && allowedTrainsList ? userTrainsData : []}
                        allowedTrainsList={allowedTrainsList ? allowedTrainsList : []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </>
    );
};
