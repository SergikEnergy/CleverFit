import { FC } from 'react';

import { AboutApp } from '@components/aboutApp';
import { CardsSection } from '@components/cardsSection';

import classes from './mainContent.module.css';

export const MainContent: FC = () => {
    return (
        <div className={`${classes['main__wrapper']} wrapper`}>
            <AboutApp />
            <CardsSection />
        </div>
    );
};
