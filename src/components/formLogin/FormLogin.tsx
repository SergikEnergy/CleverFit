import { FC, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { useLoginUserMutation, useCheckEmailMutation } from '@redux/API/authAPI';
import { LoaderStateContext } from '../../reactContexts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { IErrorData } from '@redux/API/api-types';
import { setCredentials, saveCredentialsToStorage } from '@redux/reducers/authSlice';
import { saveEmail } from '@redux/reducers/userSlice';

import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import classes from './FormLogin.module.css';

type FieldType = {
    userEmail?: string;
    password?: string;
    confirmPassword?: string;
    remember?: boolean;
};

type MouseEventOnClick = React.MouseEvent<HTMLButtonElement>;

export const FormLogin: FC = () => {
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [disableForgot, setDisableForgot] = useState(false);
    const [form] = Form.useForm();
    const emailValue = Form.useWatch('userEmail', form);
    const [loginUser, { isLoading: isRTKLoading }] = useLoginUserMutation();
    const [checkEmailRequest, { isLoading: isCheckEmailLoading }] = useCheckEmailMutation();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const emailFromState = useAppSelector((state) => state.user.email);

    useEffect(() => {
        if (isRTKLoading || isCheckEmailLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, []);

    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_CHECK_EMAIL) {
            startLoader();
            sendCheckEmailRequest({ email: emailFromState }).finally(() => stopLoader());
        }
    }, []);

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

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

    const sendCheckEmailRequest = async ({ email }: { email: string }) => {
        try {
            await checkEmailRequest({ email }).unwrap();
            dispatch(saveEmail({ email }));
            history.push(Paths.AUTH_CONFIRM_EMAIL, { fromPath: location.pathname });
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                const errorData = error.data as IErrorData;
                if (error.status === 404 && errorData && errorData.message === 'Email не найден') {
                    history.push(Paths.ERROR_NO_EMAIL_AND_404, { fromPath: location.pathname });
                } else {
                    history.push(Paths.ERROR_CHECK_EMAIL, { fromPath: location.pathname });
                }
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
        if (!emailValue) {
            setDisableForgot(true);
        } else {
            sendCheckEmailRequest({ email: emailValue }).finally(() => {
                stopLoader();
            });
        }
    };

    const handleFormChanged: () => void = () => {
        const hasErrorEmail = form.getFieldError('userEmail')[0] ? true : false;
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
                className={classes['wrapper__email']}
                rules={[
                    {
                        required: true,
                        message: '   ',
                        pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
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
                help={isPasswordHelperVisible ? passwordErrorMessage : ''}
                className={classnames(classes['password-wrapper'], classes.antFixed)}
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
                        message: passwordErrorMessage,
                    },
                ]}
            >
                <Input.Password
                    data-test-id='login-password'
                    placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                    size='large'
                    style={{ outline: 'none' }}
                    className={classnames(classes.input, classes.antFixed)}
                    onChange={() => {
                        setPassPlaceholderVisible(false);
                    }}
                    onFocus={() => {
                        setIsPasswordHelperVisible(true);
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <div className={classes['checkbox-wrapper']}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
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
                    block
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={handleGoogleRegister}
                    type='default'
                    block
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
