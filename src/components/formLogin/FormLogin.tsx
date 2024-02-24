import { FC, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { useLoginUserMutation } from '@redux/API/authAPI';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Paths } from '../../routes/pathes';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { setCredentials, saveCredentialsToStorage } from '@redux/reducers/authSlice';

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
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [disableForgot, setDisableForgot] = useState(false);
    const [form] = Form.useForm();
    const emailValue = Form.useWatch('userEmail', form);
    const [loginUser, { isLoading: isRTKLoading }] = useLoginUserMutation();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const location = useLocation();
    const dispatch = useAppDispatch();

    if (isRTKLoading) {
        startLoader();
    } else {
        stopLoader();
    }

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

    const handleSubmit = async (values: FieldType) => {
        const isRememberToken = Boolean(values.remember);
        const loginData = {
            email: values.userEmail as string,
            password: values.password as string,
            rememberMe: isRememberToken,
        };
        console.log(loginData);
        sendLoginData(loginData).finally(() => {
            stopLoader();
        });
    };

    const handleForgotPassword = (event: MouseEventOnClick) => {
        event.preventDefault();
        if (!emailValue) {
            setDisableForgot(true);
        } else {
            console.log(event);
        }
    };

    const handleFormChanged: () => void = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setDisabledSubmit(!!hasErrors);

        const hasErrorEmail = form.getFieldError('userEmail')[0] ? true : false;
        setDisableForgot(hasErrorEmail);
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
                    <Checkbox className={classes['checkbox-text']}>Запомнить меня</Checkbox>
                </Form.Item>

                <div>
                    <Button
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
                    type='primary'
                    htmlType='submit'
                    block
                    disabled={disabledSubmit}
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button
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
