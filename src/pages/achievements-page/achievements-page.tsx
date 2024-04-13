import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowWidth } from '@hooks/use-window-size';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useGetAllowedTrainsListQuery, useGetAllTrainingsQuery } from '@redux/api/trainings-api';
import {
    setAllowedTrainingsList,
    setUserTrainingsFromServer,
} from '@redux/reducers/trainings-slice';
import { useAuthSelector } from '@redux/selectors';

import { useCollapseContext, useLoaderContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './achievements-page.module.css';

export const AchievementsPage: FC = () => {
    const { startLoader, stopLoader } = useLoaderContext();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAuthSelector();
    const { hideCollapsed } = useCollapseContext();
    const innerWindowWidth = useWindowWidth();
    const firstRender = useRef(true);
    const { data: trainingsList, isLoading: isFetchingAllowedTrainingsList } =
        useGetAllowedTrainsListQuery();

    const { data: userTrainingsData, isSuccess: isSuccessGettingAllTrainings } =
        useGetAllTrainingsQuery();

    useEffect(() => {
        if (trainingsList && Array.isArray(trainingsList)) {
            dispatch(setAllowedTrainingsList(trainingsList));
        }
    }, [dispatch, trainingsList]);

    useEffect(() => {
        if (isFetchingAllowedTrainingsList) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllowedTrainingsList, startLoader, stopLoader]);

    useEffect(() => {
        if (isSuccessGettingAllTrainings && token && userTrainingsData) {
            dispatch(setUserTrainingsFromServer(userTrainingsData));
        }
    }, [dispatch, isSuccessGettingAllTrainings, token, userTrainingsData]);

    useEffect(() => {
        if (innerWindowWidth < 500 && firstRender.current) {
            hideCollapsed();
            firstRender.current = false;
        }
    }, [hideCollapsed, innerWindowWidth]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    return (
        <div className={classes.wrapper}>
            <BasePagesLayout isTrainingsPage={true}>
                <div className={classes.achievements}>ff</div>
            </BasePagesLayout>
        </div>
    );
};
