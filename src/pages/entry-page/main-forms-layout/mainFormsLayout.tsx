import { FC } from 'react';

import LogoForm from '/images/LogoForms.svg';
import { Button } from 'antd';
import classes from './mainFormsLayout..module.css';
import classnames from 'classnames';

interface MainFormsLayoutProps {
    setActiveLogin?: boolean;
}

export const MainFormsLayout: FC<MainFormsLayoutProps> = ({ setActiveLogin }) => {
    return (
        <>
            <div className={classes.logo}>
                <img src={LogoForm} alt='Logotype' />
            </div>
            <div className={classes.buttons}>
                <Button block className={classnames({ [classes.active]: setActiveLogin })}>
                    Вход
                </Button>
                <Button block className={classnames({ [classes.active]: !setActiveLogin })}>
                    Регистрация
                </Button>
            </div>
        </>
    );
};
