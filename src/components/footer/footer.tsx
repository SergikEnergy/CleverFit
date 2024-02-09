import { FC } from 'react';

import { Reviews } from '@components/reviews';
import { PhoneDownload } from '@components/phoneDownload';

import classes from './footer.module.css';

export const Footer: FC = () => {
    return (
        <div className={`${classes['footer__wrapper']} wrapper`}>
            <Reviews />
            <PhoneDownload />
        </div>
    );
};
