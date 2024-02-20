import { FC, useState } from 'react';

import { Result } from 'antd';
import VerificationInput from 'react-verification-input';
import classes from './confirmEmailPage.module.css';
import classnames from 'classnames';

export const ConfirmEmailPage: FC = () => {
    const [isCorrect, setIsCorrect] = useState(true);

    const eMail = 'email@example.com';
    const title = isCorrect
        ? 'Введите код\nдля\u00A0восстановления аккауанта'
        : 'Неверный код. Введите код для\u00A0восстановления аккауанта';
    const additionalInfo = 'Не пришло письмо? Проверьте папку Спам.';

    const handleCompleteInput = (e: any) => {
        console.log(e);
        console.log(typeof e);
    };

    return (
        <div className={classes.confirm}>
            {isCorrect && <Result title={title} />}
            {!isCorrect && <Result title={title} status='error' />}
            <p className={classes.subtitle}>
                Мы отправили вам на e-mail <span className={classes.email}>{eMail}</span>
                <br />
                шестизначный код. Введите его в поле ниже.
            </p>
            <VerificationInput
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
