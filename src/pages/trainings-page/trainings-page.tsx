import { FC, useContext, useEffect, useLayoutEffect } from 'react';

import { CollapsedContext, TariffDrawerContextProvider } from '../../react-contexts';
import { Paths } from '../../routes/pathes';
import { useAuthSelector } from '@redux/selectors';
import { useNavigate, Navigate } from 'react-router';
import { useWindowWidth } from '@hooks/use-window-size';
import { BasePagesLayout } from '@pages/base-pages-layout';

import classes from './trtainings-page.module.css';

export const TrainingsPage: FC = () => {
    const { hideCollapsed } = useContext(CollapsedContext);
    const innerWindowWidth = useWindowWidth();

    if (innerWindowWidth < 500) {
        hideCollapsed();
    }

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
        <TariffDrawerContextProvider>
            <BasePagesLayout>
                <div className={classes.trainings}>train</div>
            </BasePagesLayout>
        </TariffDrawerContextProvider>
    );
};
