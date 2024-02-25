import { FC, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRegisterUserMutation } from '@redux/API/authAPI';
import { history } from '@redux/configure-store';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { Paths } from '../../routes/pathes';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { saveRegistrationData, removeRegistrationData } from '@redux/reducers/userSlice';

import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import classnames from 'classnames';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import classes from './FormRegistration.module.css';

type FieldType = {
    userEmail?: string;
    password?: string;
    confirmPassword?: string;
    remember?: string;
};

export const FormRegistration: FC = () => {
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [confirmPlaceholderVisible, setConfirmPlaceholderVisible] = useState(true);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [form] = Form.useForm();
    const [registerUser, { isLoading: isRTKLoading }] = useRegisterUserMutation();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.user);

    if (isRTKLoading) {
        startLoader();
    } else {
        stopLoader();
    }
    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_OTHERS) {
            startLoader();
            sendRegisterData(userData).finally(() => stopLoader());
        }
    }, []);

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
    const matchedErrorMessage = 'Пароли не совпадают';

    const sendRegisterData = async ({ email, password }: { email: string; password: string }) => {
        try {
            await registerUser({ email, password }).unwrap();
            dispatch(removeRegistrationData());
            history.push(Paths.SUCCESS_REGISTRATION, { fromPath: location.pathname });
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 409) {
                    history.push(Paths.ERROR_NO_USER_409, { fromPath: location.pathname });
                } else {
                    dispatch(saveRegistrationData({ email, password, confirmPassword: '' }));
                    history.push(Paths.ERROR_OTHERS, { fromPath: location.pathname });
                }
            }
        }
    };

    const handleSubmit = async (values: FieldType) => {
        const registrationData = {
            email: values.userEmail as string,
            password: values.password as string,
        };
        await sendRegisterData(registrationData);
    };

    const handleFormChanged: () => void = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setDisabledSubmit(hasErrors);
    };

    return (
        <Form
            form={form}
            onFieldsChange={handleFormChanged}
            name='registrationForm'
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
                        message: '',
                        pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
                    },
                ]}
            >
                <Input
                    data-test-id='registration-email'
                    style={{ outline: 'none' }}
                    className={classnames(classes.email, classes.input, classes.antFixed)}
                    addonBefore='e-mail:'
                />
            </Form.Item>
            <Form.Item<FieldType>
                help={isPasswordHelperVisible ? passwordErrorMessage : ''}
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
                    data-test-id='registration-password'
                    placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                    onChange={() => {
                        setPassPlaceholderVisible(false);
                    }}
                    style={{ outline: 'none' }}
                    className={classnames(classes.input, classes.antFixed)}
                    onFocus={() => {
                        setIsPasswordHelperVisible(true);
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item<FieldType>
                name='confirmPassword'
                className={classnames(classes.antFixed, classes['confirm-field'])}
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
                    data-test-id='registration-confirm-password'
                    placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                    style={{ outline: 'none' }}
                    onChange={() => {
                        setConfirmPlaceholderVisible(false);
                    }}
                    className={classnames(classes.input, classes.antFixed)}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                <Button
                    size='large'
                    className={classnames(classes['submit-button'], classes.antFixed)}
                    type='primary'
                    htmlType='submit'
                    block
                    disabled={disabledSubmit}
                    data-test-id='registration-submit-button'
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
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
