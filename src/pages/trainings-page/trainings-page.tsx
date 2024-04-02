import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useWindowWidth } from '@hooks/use-window-size';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useAuthSelector } from '@redux/selectors';

import { useCollapseContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import { TrainingsContent } from './components';

import classes from './trainings-page.module.css';

export const TrainingsPage: FC = () => {
    const { hideCollapsed } = useCollapseContext();

    const innerWindowWidth = useWindowWidth();
    const firstResize = useRef(true);

    useEffect(() => {
        if (innerWindowWidth < 500 && firstResize.current) {
            hideCollapsed();
            firstResize.current = false;
        }
    }, [hideCollapsed, innerWindowWidth]);

    const navigate = useNavigate();
    const { token } = useAuthSelector();

    // useLayoutEffect(() => {
    //     getAllTariffs();
    // }, [getAllTariffs]);

    // useEffect(() => {
    //     if (isFetchedTariffs && tariffs) {
    //         dispatch(saveAvailableTariffs({ tariffs }));
    //     }
    // }, [dispatch, isFetchedTariffs, tariffs]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace={true} />;
    }

    return (
        <div className={classes.trainings__page}>
            <BasePagesLayout isTrainingsPage={true}>
                <div className={classes.trainings}>
                    <TrainingsContent />
                </div>
            </BasePagesLayout>
        </div>
    );
};
