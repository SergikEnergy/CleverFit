import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import LogoIcon from '/images/LogoFit.svg';
import LogoText from '/images/LogoText.svg';
import LogoMobile from '/images/LogoMobile.svg';
import classes from './logo.module.css';
import classnames from 'classnames';

export const Logo: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={classnames(classes.logo, { [classes.collapsed]: collapsed })}>
            <div className={classes.mobile}>
                <img src={LogoMobile} alt='Logo' />
            </div>
            <div className={classnames(classes['logo__text'], { [classes.hidden]: collapsed })}>
                <img src={LogoText} alt='Clever' />
            </div>
            <div className={classes['logo__icon']}>
                <img src={LogoIcon} alt='fit' />
            </div>
        </div>
    );
};
