import { FC, useState, useContext } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { LoaderStateContext } from '../../../reactContexts/loader-context';
import { useConfirmEmailMutation } from '@redux/API/authAPI';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { Paths } from '../../../routes/pathes';
import { history } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';

import { Result } from 'antd';
import VerificationInput from 'react-verification-input';
import classes from './confirmEmailPage.module.css';
import classnames from 'classnames';

export const ConfirmEmailPage: FC = () => {
    const location = useLocation();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const [confirmEmailRequest, { isLoading }] = useConfirmEmailMutation();
    const [isCorrect, setIsCorrect] = useState(true);
    const [value, setValue] = useState('');
    const userEmail = useAppSelector((state) => state.user.email);
    if (isLoading) {
        startLoader();
    } else {
        stopLoader();
    }

    const handleCodeChange = (value: string) => {
        setValue(value);
    };

    const title = isCorrect
        ? 'Введите код\nдля\u00A0восстановления аккауанта'
        : 'Неверный код. Введите код для\u00A0восстановления аккауанта';
    const additionalInfo = 'Не пришло письмо? Проверьте папку Спам.';

    const sendVerificationCode = async (email: string, code: string) => {
        try {
            const response = await confirmEmailRequest({ email, code }).unwrap();
            if (response) {
                history.push(Paths.AUTH_CHANGE_PASS, { fromPath: location.pathname });
            }
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                setIsCorrect(false);
                setValue('');
            }
        }
    };

    const handleCompleteInput = async (value: string) => {
        sendVerificationCode(userEmail, value);
    };

    return (
        <div className={classes.confirm}>
            {isCorrect && <Result title={title} />}
            {!isCorrect && <Result title={title} status='error' />}
            <p className={classes.subtitle}>
                Мы отправили вам на e-mail <span className={classes.email}>{userEmail}</span>
                <br />
                шестизначный код. Введите его в поле ниже.
            </p>
            <VerificationInput
                onChange={handleCodeChange}
                value={value}
                data-test-id='verification-input'
                placeholder=''
                validChars='0-9'
                inputProps={{ inputMode: 'numeric' }}
                onComplete={handleCompleteInput}
                classNames={{
                    container: classes.container,
                    character: classnames(classes.character, { [classes.incorrect]: !isCorrect }),
                    characterInactive: classes['character__inactive'],
                    characterSelected: classes['character__selected'],
                    characterFilled: classes['character__filled'],
                }}
            />
            <p className={classes.additional}>{additionalInfo}</p>
        </div>
    );
};
