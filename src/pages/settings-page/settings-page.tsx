import { FC, useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SettingsFooter } from '@components/settings-footer';
import { SettingsHeader } from '@components/settings-header';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { useLazyGetTariffsListQuery } from '@redux/api/settings-api';
import { saveAvailableTariffs } from '@redux/reducers/tariff-slice';

import { Paths } from '../../routes/pathes';

export const SettingsPage: FC = () => {
    const [getAllTariffs, { data: tariffs, isSuccess: isGetchedTariffs }] =
        useLazyGetTariffsListQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

    useLayoutEffect(() => {
        getAllTariffs();
    }, [getAllTariffs]);

    useEffect(() => {
        if (isGetchedTariffs && tariffs) {
            dispatch(saveAvailableTariffs(tariffs));
        }
    }, [dispatch, isGetchedTariffs, tariffs]);

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
            {/* <SettingsContent/> */}
            <SettingsFooter />
        </BasePagesLayout>
    );
};
