import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ErrorDataType } from '@redux/api/api-types';
import { useCheckEmailMutation, useLoginUserMutation } from '@redux/api/auth-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { history } from '@redux/configure-store';
import { saveCredentialsToStorage, setCredentials } from '@redux/reducers/auth-slice';
import { saveEmail } from '@redux/reducers/user-slice';
import { useUserSelector } from '@redux/selectors';
import { PASSWORD_ERROR_MESSAGE } from '@utils/constants/error-form-messages';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@utils/constants/patterns-reg-exp';
import { Button, Checkbox, Form, Input } from 'antd';
import classnames from 'classnames';

import { getIconRender } from '../../helpers/get-password-icon';
import { useLoaderContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import { FieldType, MouseEventOnClick } from './form-login.types';

import classes from './form-login.module.css';

export const FormLogin: FC = () => {
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [disableForgot, setDisableForgot] = useState(false);
    const [form] = Form.useForm();
    const emailValue = Form.useWatch('userEmail', form);
    const [loginUser, { isLoading: isRTKLoading }] = useLoginUserMutation();
    const [checkEmailRequest, { isLoading: isCheckEmailLoading }] = useCheckEmailMutation();
    const { startLoader, stopLoader } = useLoaderContext();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { email: emailFromState } = useUserSelector();

    useEffect(() => {
        if (isRTKLoading || isCheckEmailLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isCheckEmailLoading, isRTKLoading, startLoader, stopLoader]);

    const sendCheckEmailRequest = useCallback(
        async ({ email }: { email: string }) => {
            try {
                await checkEmailRequest({ email }).unwrap();
                dispatch(saveEmail({ email }));
                history.push(Paths.AUTH_CONFIRM_EMAIL, { fromPath: location.pathname });
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    const errorData = error.data as ErrorDataType;

                    if (
                        error.status === 404 &&
                        errorData &&
                        errorData.message === 'Email не найден'
                    ) {
                        history.push(Paths.ERROR_NO_EMAIL_AND_404, { fromPath: location.pathname });
                    } else {
                        history.push(Paths.ERROR_CHECK_EMAIL, { fromPath: location.pathname });
                    }
                }
            }
        },
        [checkEmailRequest, dispatch, location.pathname],
    );

    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_CHECK_EMAIL) {
            startLoader();
            sendCheckEmailRequest({ email: emailFromState }).finally(() => stopLoader());
        }
    }, [emailFromState, location.state, sendCheckEmailRequest, startLoader, stopLoader]);

    const sendLoginData = async ({
        email,
        password,
        rememberMe,
    }: {
        email: string;
        password: string;
        rememberMe: boolean;
    }) => {
        try {
            const dataWithToken = await loginUser({ email, password }).unwrap();

            if (dataWithToken) {
                const { accessToken } = dataWithToken;

                dispatch(
                    setCredentials({
                        email,
                        password,
                        rememberMe,
                        token: accessToken,
                    }),
                );
                dispatch(saveCredentialsToStorage());
                history.push(Paths.MAIN_PAGE, { fromPath: location.pathname });
            }
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                history.push(Paths.ERROR_LOGIN, { fromPath: location.pathname });
            }
        }
    };

    const handleSubmit = async (values: FieldType) => {
        const isRememberToken = Boolean(values.remember);
        const loginData = {
            email: values.userEmail as string,
            password: values.password as string,
            rememberMe: isRememberToken,
        };

        startLoader();
        sendLoginData(loginData).finally(() => {
            stopLoader();
        });
    };

    const handleForgotPassword = (event: MouseEventOnClick) => {
        event.preventDefault();
        if (emailValue) {
            sendCheckEmailRequest({ email: emailValue }).finally(() => {
                stopLoader();
            });
        } else {
            setDisableForgot(true);
        }
    };

    const handleFormChanged: () => void = () => {
        const hasErrorEmail = !!form.getFieldError('userEmail')[0];

        setDisableForgot(hasErrorEmail);
    };

    const handleGoogleRegister = async () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    return (
        <Form
            onFieldsChange={handleFormChanged}
            form={form}
            name='loginForm'
            style={{ width: '100%' }}
            autoComplete='off'
            onFinish={handleSubmit}
            className={classes.form}
        >
            <Form.Item<FieldType>
                name='userEmail'
                className={classes.wrapper__email}
                rules={[
                    {
                        required: true,
                        message: '   ',
                        pattern: EMAIL_VALIDATION,
                    },
                ]}
            >
                <Input
                    size='large'
                    style={{ outline: 'none' }}
                    className={classnames(classes.email, classes.input, classes.antFixed)}
                    data-test-id='login-email'
                    addonBefore='e-mail:'
                />
            </Form.Item>
            <Form.Item<FieldType>
                help={isPasswordHelperVisible ? PASSWORD_ERROR_MESSAGE : ''}
                className={classnames(classes['password-wrapper'], classes.antFixed)}
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: PASSWORD_VALIDATION,
                        message: PASSWORD_ERROR_MESSAGE,
                    },
                ]}
            >
                <Input.Password
                    data-test-id='login-password'
                    placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                    size='large'
                    style={{ outline: 'none' }}
                    className={classnames(classes.input, classes.antFixed)}
                    onChange={() => setPassPlaceholderVisible(false)}
                    onFocus={() => setIsPasswordHelperVisible(true)}
                    iconRender={(visible) => getIconRender(visible)}
                />
            </Form.Item>
            <div className={classes['checkbox-wrapper']}>
                <Form.Item name='remember' valuePropName='checked' noStyle={true}>
                    <Checkbox className={classes['checkbox-text']} data-test-id='login-remember'>
                        Запомнить меня
                    </Checkbox>
                </Form.Item>

                <div>
                    <Button
                        data-test-id='login-forgot-button'
                        htmlType='button'
                        disabled={disableForgot}
                        type='text'
                        className={classes['forgot-link']}
                        onClick={handleForgotPassword}
                    >
                        Забыли пароль?
                    </Button>
                </div>
            </div>
            <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                <Button
                    size='large'
                    className={classnames(classes['submit-button'], classes.antFixed)}
                    data-test-id='login-submit-button'
                    type='primary'
                    htmlType='submit'
                    block={true}
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={handleGoogleRegister}
                    type='default'
                    block={true}
                    icon={
                        <GooglePlusOutlined
                            className={classnames(classes['google-icon'], classes.antFixed)}
                        />
                    }
                    size='large'
                    className={classnames(classes['google-button'], classes.antFixed)}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
