import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useChangePasswordMutation } from '@redux/api/auth-api';
import { history } from '@redux/configure-store';
import { removeRegistrationData, saveRegistrationData } from '@redux/reducers/user-slice';
import { useUserSelector } from '@redux/selectors';
import { PASSWORD_VALIDATION } from '@utils/constants/patterns-reg-exp';
import { Button, Form, Input } from 'antd';
import classnames from 'classnames';

import { getIconRender } from '../../../helpers/get-password-icon';
import { LoaderStateContext } from '../../../react-contexts';
import { Paths } from '../../../routes/pathes';

import classes from './change-password-page.module.css';

type RebootPassFieldType = {
    password?: string;
    confirmPassword?: string;
};

export const ChangePasswordPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
    } = useUserSelector();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [confirmPlaceholderVisible, setConfirmPlaceholderVisible] = useState(true);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [form] = Form.useForm();

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
    const matchedErrorMessage = 'Пароли не совпадают';

    if (isLoading) {
        startLoader();
    } else {
        stopLoader();
    }

    const sendChangePasswordRequest = useCallback(
        async (password: string, confirmPassword: string) => {
            try {
                await changeUserPassword({ password, confirmPassword }).unwrap();
                history.push(Paths.SUCCESS_CHANGE_PASSWORD, { fromPath: location.pathname });
                dispatch(removeRegistrationData());
            } catch (error) {
                dispatch(saveRegistrationData({ email: userEmail, password, confirmPassword }));
                history.push(Paths.ERROR_CHANGE_PASSWORD, { fromPath: location.pathname });
            }
        },
        [changeUserPassword, dispatch, location.pathname, userEmail],
    );

    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_CHANGE_PASSWORD) {
            startLoader();
            sendChangePasswordRequest(userPassword, userConfirmPassword as string).finally(() =>
                stopLoader(),
            );
        }
    }, [
        location.state,
        sendChangePasswordRequest,
        startLoader,
        stopLoader,
        userConfirmPassword,
        userPassword,
    ]);

    const handleSubmit = async (values: RebootPassFieldType) => {
        const dataForRequest = {
            password: values.password as string,
            confirmPassword: values.confirmPassword as string,
        };

        await sendChangePasswordRequest(dataForRequest.password, dataForRequest.confirmPassword);
    };

    const handleFormChanged: () => void = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);

        setDisabledSubmit(hasErrors);
    };

    return (
        <div className={classes.changeForm}>
            <h1 className={classes.title}>Восстановление аккауанта</h1>
            <Form
                form={form}
                onFieldsChange={handleFormChanged}
                name='setNewPassForm'
                autoComplete='off'
                onFinish={handleSubmit}
                className={classes.formPassReset}
            >
                <Form.Item<RebootPassFieldType>
                    className={classnames(classes.antFixed)}
                    help={isPasswordHelperVisible ? passwordErrorMessage : ''}
                    name='password'
                    rules={[
                        {
                            required: true,
                            pattern: PASSWORD_VALIDATION,
                            message: passwordErrorMessage,
                        },
                    ]}
                >
                    <Input.Password
                        data-test-id='change-password'
                        size='large'
                        placeholder={passPlaceholderVisible ? 'Новый пароль' : ''}
                        onChange={() => {
                            setPassPlaceholderVisible(false);
                        }}
                        style={{ outline: 'none' }}
                        onFocus={() => {
                            setIsPasswordHelperVisible(true);
                        }}
                        iconRender={(visible) => getIconRender(visible)}
                    />
                </Form.Item>
                <Form.Item<RebootPassFieldType>
                    name='confirmPassword'
                    className={classnames(classes.antFixed)}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error(matchedErrorMessage));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        data-test-id='change-confirm-password'
                        size='large'
                        placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                        style={{ outline: 'none' }}
                        onChange={() => {
                            setConfirmPlaceholderVisible(false);
                        }}
                        iconRender={(visible) => getIconRender(visible)}
                    />
                </Form.Item>
                <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                    <Button
                        data-test-id='change-submit-button'
                        size='large'
                        className={classnames(classes['submit-button'], classes.antFixed)}
                        type='primary'
                        htmlType='submit'
                        block={true}
                        disabled={disabledSubmit}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
