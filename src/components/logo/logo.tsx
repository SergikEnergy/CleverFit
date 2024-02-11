import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import LogoIcon from '/images/LogoFit.svg';
import LogoText from '/images/LogoText.svg';
import LogoMobile from '/images/LogoMobile.svg';
import classes from './logo.module.css';

export const Logo: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={!collapsed ? `${classes.logo}` : `${classes.logo} ${classes.collapsed}`}>
            <div className={classes.mobile}>
                <img src={LogoMobile} alt='Logo' />
            </div>
            <div
                className={
                    !collapsed
                        ? classes['logo__text']
                        : `${classes['logo__text']} ${classes.hidden}`
                }
            >
                <img src={LogoText} alt='Clever' />
            </div>
            <div className={classes['logo__icon']}>
                <img src={LogoIcon} alt='fit' />
            </div>
        </div>
    );
};
