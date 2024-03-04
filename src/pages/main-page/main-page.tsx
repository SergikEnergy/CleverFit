import { FC, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CollapsedContext } from '../../reactContexts/collapse-context';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';

import { Footer } from '@components/footer';
import { MainContent } from '@components/mainContent';
import { BaseMainFeedbacksLayout } from '@pages/baseMainFeedbacks';
import { Layout as AntLayout } from 'antd';
import './main-page.css';

const { Footer: AntFooter } = AntLayout;

export const MainPage: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    if (!token) {
        return <Navigate to={Paths.AUTH} replace />;
    } else {
        return (
            <BaseMainFeedbacksLayout>
                <MainContent />
                <AntFooter
                    className={!collapsed ? 'footer' : 'footer collapsed'}
                    style={{ padding: 0, background: 'transparent' }}
                >
                    <Footer />
                </AntFooter>
            </BaseMainFeedbacksLayout>
        );
    }
};
