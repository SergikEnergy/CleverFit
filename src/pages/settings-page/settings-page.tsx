import { FC, useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { SettingsContent } from '@pages/settings-page/components/settings-content';
import { SettingsFooter } from '@pages/settings-page/components/settings-footer';
import { SettingsHeader } from '@pages/settings-page/components/settings-header';
import { useLazyGetTariffsListQuery } from '@redux/api/settings-api';
import { saveAvailableTariffs } from '@redux/reducers/tariff-slice';

import { Paths } from '../../routes/pathes';

import classes from './settings-page.module.css';

export const SettingsPage: FC = () => {
    const [getAllTariffs, { data: tariffs, isSuccess: isFetchedTariffs }] =
        useLazyGetTariffsListQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

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
        <BasePagesLayout customHeader={true}>
            <SettingsHeader />
            <div className={classes.settings}>
                <SettingsContent />
                <SettingsFooter />
            </div>
        </BasePagesLayout>
    );
};
