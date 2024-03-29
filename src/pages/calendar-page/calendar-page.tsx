import { FC, Fragment, useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDrawer } from '@components/calendar-drawer';
import { CalenDarWithData } from '@components/calendar-with-data';
import { ErrorShowAllowedTrainsList } from '@components/error-show-allowed-trains-list';
import { useResetUser } from '@hooks/reset-user';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetAllowedTrainingsLists } from '@hooks/use-get-allowed-trains-list';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetAllowedTrainsListQuery, useGetAllTrainingsQuery } from '@redux/api/calendar-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';

import { DrawerTrainsContext, LoaderStateContext, ModalReportContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './calendar-page.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const { fetchAllowedTrainingsList, trainingsList, isLoading } = useGetAllowedTrainingsLists();
    const resetUser = useResetUser();
    const location = useLocation();
    const token = useAppSelector((state) => state.auth.token);
    console.log(location);
    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { updateAllowedTrains } = useContext(DrawerTrainsContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

    // const { data: allowedTrainsList, isLoading: isFetchingAllowedTrains } =
    //     useGetAllowedTrainsListQuery();

    const { data: userTrainingsData } = useGetAllTrainingsQuery();

    // const handlerErrorCloseAction = useCallback(() => {
    //     setNode(null);
    //     closeModal();
    // }, [closeModal, setNode]);

    // const handleErrorAllowedTrainings = useCallback(
    //     (error: unknown) => {
    //         if (isFetchBaseQueryError(error)) {
    //             if (error.status === 403) {
    //                 resetUser();
    //             } else {
    //                 setNode(
    //                     <ErrorShowAllowedTrainsList
    //                         status='info'
    //                         closeClickAction={handlerErrorCloseAction}
    //                     />,
    //                 );
    //                 setWidthModal('clamp(328px, 100%, 384px)');
    //                 openModal();
    //             }
    //         }
    //     },
    //     [
    //         handlerErrorCloseAction,
    //         openModal,
    //         resetUser,
    //         setNode,
    //         setWidthModal,
    //     ],
    // );

    // const fetchAllowedTrainingsList = useCallback(async () => {
    //     try {
    //         const trainingsAllowed = await getAllowedTrainingsList();

    //         if (Array.isArray(trainingsAllowed.data)) {
    //             updateAllowedTrains(trainingsAllowed.data);
    //         } else if (isFetchBaseQueryError(trainingsAllowed)) {
    //             handleErrorAllowedTrainings(trainingsAllowed);
    //         }
    //     } catch (error) {
    //         handleErrorAllowedTrainings(error);
    //     } finally {
    //         stopLoader();
    //     }
    // }, [getAllowedTrainingsList, handleErrorAllowedTrainings, stopLoader, updateAllowedTrains]);

    // function refetchAllowedTrainingsList() {
    //     setNode(null);
    //     closeModal();
    //     fetchAllowedTrainingsList();
    // }

    useEffect(() => {
        if (location.state && 'allowRequest' in location.state && location.state.allowRequest) {
            fetchAllowedTrainingsList();
        }
    }, [fetchAllowedTrainingsList, location.state, userTrainingsData]);

    // useEffect(() => {
    //     if (location.state.allowRequest) {
    //         fetchAllowedTrainingsList();
    //     }
    // }, [fetchAllowedTrainingsList, location.state.allowRequest, userTrainingsData]);

    useEffect(() => {
        if (isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isLoading, startLoader, stopLoader]);

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
                        dataForRender={userTrainingsData && trainingsList ? userTrainingsData : []}
                        allowedTrainsList={trainingsList || []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </Fragment>
    );
};
