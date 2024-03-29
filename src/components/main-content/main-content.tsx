import { FC } from 'react';
import { AboutApp } from '@components/about-app';
import { CardsSection } from '@components/cards-section';

import classes from './main-content.module.css';

export const MainContent: FC = () => (
    <div className={`${classes.main__wrapper} wrapper`}>
        <AboutApp />
        <CardsSection />
    </div>
);
