import { FC, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CollapsedContext } from '../../reactContexts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';

import { Footer } from '@components/footer';
import { MainContent } from '@components/mainContent';
import { BasePagesLayout } from '@pages/basePagesLayout';
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
            <BasePagesLayout>
                <MainContent />
                <AntFooter
                    className={!collapsed ? 'footer' : 'footer collapsed'}
                    style={{ padding: 0, background: 'transparent' }}
                >
                    <Footer />
                </AntFooter>
            </BasePagesLayout>
        );
    }
};
