import { FC, Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDrawer } from '@components/calendar-drawer';
import { CalenDarWithData } from '@components/calendar-with-data';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetAllowedTrainingsLists } from '@hooks/use-get-allowed-trainings-list';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetAllTrainingsQuery } from '@redux/api/trainings-api';
import { setAllowedTrainingsList } from '@redux/reducers/trainings-slice';
import { useAuthSelector, useUserTrainingsSelector } from '@redux/selectors';

import { useLoaderContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './calendar-page.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { allowedTrainingsList } = useUserTrainingsSelector();
    const { fetchAllowedTrainingsList, trainingsList, isLoading, isSuccessGettingList } =
        useGetAllowedTrainingsLists();
    const location = useLocation();
    const { token } = useAuthSelector();
    const { startLoader, stopLoader } = useLoaderContext();

    const { data: userTrainingsData } = useGetAllTrainingsQuery();

    useEffect(() => {
        if (location.state && 'allowRequest' in location.state && location.state.allowRequest) {
            fetchAllowedTrainingsList();
            location.state.allowRequest = false;
        }
    }, [fetchAllowedTrainingsList, location.state, userTrainingsData]);

    useEffect(() => {
        if (Array.isArray(trainingsList) && isSuccessGettingList) {
            dispatch(setAllowedTrainingsList(trainingsList));
        }
    }, [
        dispatch,
        fetchAllowedTrainingsList,
        isSuccessGettingList,
        location.state,
        trainingsList,
        userTrainingsData,
    ]);

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
                        dataForRender={
                            userTrainingsData && allowedTrainingsList ? userTrainingsData : []
                        }
                        allowedTrainsList={trainingsList || []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </Fragment>
    );
};
