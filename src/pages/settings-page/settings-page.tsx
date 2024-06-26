import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowWidth } from '@hooks/use-window-size';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { SettingsContent } from '@pages/settings-page/components/settings-content';
import { SettingsFooter } from '@pages/settings-page/components/settings-footer';
import { SettingsHeader } from '@pages/settings-page/components/settings-header';
import { useLazyGetTariffsListQuery } from '@redux/api/settings-api';
import { saveAvailableTariffs } from '@redux/reducers/tariff-slice';
import { useAuthSelector } from '@redux/selectors';

import { TariffDrawerContextProvider, useCollapseContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './settings-page.module.css';

export const SettingsPage: FC = () => {
    const { hideCollapsed } = useCollapseContext();

    const innerWindowWidth = useWindowWidth();
    const firstResize = useRef(true);

    useEffect(() => {
        if (innerWindowWidth < 500 && firstResize.current) {
            hideCollapsed();
            firstResize.current = false;
        }
    }, [hideCollapsed, innerWindowWidth]);

    const [getAllTariffs, { data: tariffs, isSuccess: isFetchedTariffs }] =
        useLazyGetTariffsListQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAuthSelector();

    useLayoutEffect(() => {
        getAllTariffs();
    }, [getAllTariffs]);

    useEffect(() => {
        if (isFetchedTariffs && tariffs) {
            dispatch(saveAvailableTariffs({ tariffs }));
        }
    }, [dispatch, isFetchedTariffs, tariffs]);

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
            <BasePagesLayout customHeader={true}>
                <SettingsHeader />
                <div className={classes.settings}>
                    <SettingsContent />
                    <SettingsFooter />
                </div>
            </BasePagesLayout>
        </TariffDrawerContextProvider>
    );
};
