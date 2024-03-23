import { FC, Fragment, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDrawer } from '@components/calendar-drawer';
import { CalenDarWithData } from '@components/calendar-with-data';
import { ErrorShowAllowedTrainsList } from '@components/error-show-allowed-trains-list';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { useGetAllTrainingsQuery, useLazyGetAllowedTrainsListQuery } from '@redux/api/calendar-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { resetCredentials } from '@redux/reducers/auth-slice';

import { DrawerTrainsContext, LoaderStateContext, ModalReportContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './calendar-page.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { updateAllowedTrains } = useContext(DrawerTrainsContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

    const [
        getAllowedTrainingsList,
        { data: allowedTrainsList, isLoading: isFetchingAllowedTrains },
    ] = useLazyGetAllowedTrainsListQuery();

    const { data: userTrainingsData } = useGetAllTrainingsQuery();

    const handlerErrorCloseAction = () => {
        setNode(null);
        closeModal();
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

    function refetchAllowedTrainingsList() {
        setNode(null);
        closeModal();
        fetchAllowedTrainingsList();
    }

    useEffect(() => {
        if (location.state.allowRequest) {
            fetchAllowedTrainingsList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTrainingsData]);

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

    return (
        <Fragment>
            <BasePagesLayout isCalendarPage={true}>
                <div className={classes.wrapper} id='modalWrapperCalendar'>
                    <CalenDarWithData
                        dataForRender={
                            userTrainingsData && allowedTrainsList ? userTrainingsData : []
                        }
                        allowedTrainsList={allowedTrainsList || []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </Fragment>
    );
};
