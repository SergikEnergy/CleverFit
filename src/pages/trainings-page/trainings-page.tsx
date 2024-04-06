import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetAllowedTrainingsLists } from '@hooks/use-get-allowed-trainings-list';
import { useWindowWidth } from '@hooks/use-window-size';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetAllTrainingsQuery } from '@redux/api/trainings-api';
import { setTrainingType } from '@redux/reducers/trainings-partners-slice';
import {
    setAllowedTrainingsList,
    setUserTrainingsFromServer,
} from '@redux/reducers/trainings-slice';
import { useAuthSelector } from '@redux/selectors';
import { getUserTrainingsType } from '@utils/get-user-trainings-type';

import { TrainingsDrawerContextProvider, useCollapseContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import { TrainingsContent } from './components';

import classes from './trainings-page.module.css';

export const TrainingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const { fetchAllowedTrainingsList, trainingsList } = useGetAllowedTrainingsLists();
    const location = useLocation();
    const { data: userTrainingsData, isSuccess: isSuccessGettingAllTrainings } =
        useGetAllTrainingsQuery();
    const navigate = useNavigate();
    const { token } = useAuthSelector();
    const { hideCollapsed } = useCollapseContext();
    const innerWindowWidth = useWindowWidth();
    const firstRender = useRef(true);

    useEffect(() => {
        if (Array.isArray(trainingsList)) {
            dispatch(setAllowedTrainingsList(trainingsList));
        }
    }, [dispatch, trainingsList]);

    useEffect(() => {
        if (isSuccessGettingAllTrainings && token && userTrainingsData) {
            dispatch(setUserTrainingsFromServer(userTrainingsData));
        }
    }, [dispatch, isSuccessGettingAllTrainings, token, userTrainingsData]);

    useEffect(() => {
        if (
            userTrainingsData &&
            userTrainingsData.length > 0 &&
            trainingsList &&
            trainingsList.length > 0
        ) {
            dispatch(setTrainingType(getUserTrainingsType(userTrainingsData, trainingsList)));
        }
    }, [dispatch, trainingsList, userTrainingsData]);

    useEffect(() => {
        if (innerWindowWidth < 500 && firstRender.current) {
            hideCollapsed();
            firstRender.current = false;
        }
    }, [hideCollapsed, innerWindowWidth]);

    useLayoutEffect(() => {
        if (location.state && 'allowRequest' in location.state && location.state.allowRequest) {
            fetchAllowedTrainingsList();
        }
    }, [fetchAllowedTrainingsList, location.state, userTrainingsData]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    return (
        <TrainingsDrawerContextProvider>
            <div className={classes.trainings__page}>
                <BasePagesLayout isTrainingsPage={true}>
                    <div className={classes.trainings}>
                        <TrainingsContent />
                    </div>
                </BasePagesLayout>
            </div>
        </TrainingsDrawerContextProvider>
    );
};
