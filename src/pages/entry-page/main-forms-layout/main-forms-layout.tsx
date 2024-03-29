import { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import classnames from 'classnames';

import { Paths } from '../../../routes/pathes';

import classes from './main-forms-layout.module.css';

import LogoForm from '/images/LogoForms.svg';

type MainFormsLayoutPropsType = {
    setActiveLogin?: boolean;
};

export const MainFormsLayout: FC<MainFormsLayoutPropsType> = ({ setActiveLogin }) => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate(`${Paths.AUTH_REGISTRATION}`, { replace: true });
    };

    const handleLoginClick = () => {
        navigate(`${Paths.AUTH}`, { replace: true });
    };

    return (
        <Fragment>
            <div className={classes.logo}>
                <img src={LogoForm} alt='Logotype' />
            </div>
            <div className={classes.buttons}>
                <Button
                    onClick={handleLoginClick}
                    block={true}
                    className={classnames({ [classes.active]: setActiveLogin })}
                >
                    Вход
                </Button>
                <Button
                    onClick={handleRegisterClick}
                    block={true}
                    className={classnames({ [classes.active]: !setActiveLogin })}
                >
                    Регистрация
                </Button>
            </div>
        </Fragment>
    );
};
