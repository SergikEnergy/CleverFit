import { FC } from 'react';
import classnames from 'classnames';

import { useCollapseContext } from '../../react-contexts';

import classes from './logo.module.css';

import LogoIcon from '/images/LogoFit.svg';
import LogoMobile from '/images/LogoMobile.svg';
import LogoText from '/images/LogoText.svg';

export const Logo: FC = () => {
    const { collapsed } = useCollapseContext();

    return (
        <div className={classnames(classes.logo, { [classes.collapsed]: collapsed })}>
            <div className={classes.mobile}>
                <img src={LogoMobile} alt='Logo' />
            </div>
            <div className={classnames(classes.logo__text, { [classes.hidden]: collapsed })}>
                <img src={LogoText} alt='Clever' />
            </div>
            <div className={classes.logo__icon}>
                <img src={LogoIcon} alt='fit' />
            </div>
        </div>
    );
};
