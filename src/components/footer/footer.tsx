import { FC } from 'react';
import { PhoneDownload } from '@components/phone-download';
import { Reviews } from '@components/reviews';

import classes from './footer.module.css';

export const Footer: FC = () => (
    <div className={`${classes.footer__wrapper} wrapper`}>
        <Reviews />
        <PhoneDownload />
    </div>
);
