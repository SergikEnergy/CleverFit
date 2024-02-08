import { FC } from 'react';

import classes from './logo.module.css';
import LogoIcon from '/images/LogoFit.svg';
import LogoText from '/images/LogoText.svg';

export const Logo: FC = () => {
    return (
        <div className={classes.logo}>
            <div className={classes['logo__text']}>
                <img src={LogoText} alt='Clever' />
            </div>
            <div className={classes['logo__icon']}>
                <img src={LogoIcon} alt='fit Logo' />
            </div>
        </div>
    );
};
