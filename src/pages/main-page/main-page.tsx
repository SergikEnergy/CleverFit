import { FC, useContext } from 'react';
import { CollapsedContext } from '../../reactContexts/collapse-context';

import { Footer } from '@components/footer';
import { MainContent } from '@components/mainContent';
import { BaseMainFeedbacksLayout } from '@pages/baseMainFeedbacks';
import { Layout as AntLayout } from 'antd';
import './main-page.css';

const { Footer: AntFooter } = AntLayout;

export const MainPage: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
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
};
