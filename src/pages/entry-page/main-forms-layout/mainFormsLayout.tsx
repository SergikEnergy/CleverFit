import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoForm from '/images/LogoForms.svg';
import { Paths } from '../../../routes/pathes';
import { Button } from 'antd';
import classes from './mainFormsLayout..module.css';
import classnames from 'classnames';

interface MainFormsLayoutProps {
    setActiveLogin?: boolean;
}

export const MainFormsLayout: FC<MainFormsLayoutProps> = ({ setActiveLogin }) => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate(`${Paths.AUTH_REGISTRATION}`, { replace: true });
    };

    const handleLoginClick = () => {
        navigate(`${Paths.AUTH}`, { replace: true });
    };

    return (
        <>
            <div className={classes.logo}>
                <img src={LogoForm} alt='Logotype' />
            </div>
            <div className={classes.buttons}>
                <Button
                    onClick={handleLoginClick}
                    block
                    className={classnames({ [classes.active]: setActiveLogin })}
                >
                    Вход
                </Button>
                <Button
                    onClick={handleRegisterClick}
                    block
                    className={classnames({ [classes.active]: !setActiveLogin })}
                >
                    Регистрация
                </Button>
            </div>
        </>
    );
};
