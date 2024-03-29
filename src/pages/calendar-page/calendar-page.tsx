import { FC, Fragment, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDrawer } from '@components/calendar-drawer';
import { CalenDarWithData } from '@components/calendar-with-data';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetAllowedTrainingsLists } from '@hooks/use-get-allowed-trains-list';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetAllTrainingsQuery } from '@redux/api/calendar-api';

import { LoaderStateContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './calendar-page.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const { fetchAllowedTrainingsList, trainingsList, isLoading, isSuccessGettingList } =
        useGetAllowedTrainingsLists();
    const location = useLocation();
    const token = useAppSelector((state) => state.auth.token);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);

    const { data: userTrainingsData } = useGetAllTrainingsQuery();

    useEffect(() => {
        if (location.state && 'allowRequest' in location.state && location.state.allowRequest) {
            fetchAllowedTrainingsList();
        }
    }, [fetchAllowedTrainingsList, location.state, userTrainingsData]);

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
                            userTrainingsData && trainingsList && isSuccessGettingList
                                ? userTrainingsData
                                : []
                        }
                        allowedTrainsList={trainingsList || []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </Fragment>
    );
};
