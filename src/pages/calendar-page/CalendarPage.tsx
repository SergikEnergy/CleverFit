import { FC, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalReportContext } from 'src/reactContexts/modalReport-context';
import { Paths } from '../../routes/pathes';
import { BasePagesLayout } from '@pages/basePagesLayout';

import classes from './CalendarPage.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const { setNode, openModal, setWidthModal } = useContext(ModalReportContext);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    return <BasePagesLayout isCalendarPage={true}>calendar-page</BasePagesLayout>;
};
