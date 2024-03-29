import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useRegisterUserMutation } from '@redux/api/auth-api';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { history } from '@redux/configure-store';
import { removeRegistrationData, saveRegistrationData } from '@redux/reducers/user-slice';
import { useUserSelector } from '@redux/selectors';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@utils/constants/patterns-reg-exp';
import { Button, Form, Input } from 'antd';
import classnames from 'classnames';

import { ERRORS_MESSAGES } from '../../data/form-messages';
import { getIconRender } from '../../helpers/get-password-icon';
import { LoaderStateContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './form-registration.module.css';

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
    const userData = useUserSelector();

    useEffect(() => {
        if (isRTKLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isRTKLoading, startLoader, stopLoader]);

    const sendRegisterData = useCallback(
        async ({ email, password }: { email: string; password: string }) => {
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
        },
        [dispatch, location.pathname, registerUser],
    );

    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_OTHERS) {
            startLoader();
            sendRegisterData(userData).finally(() => stopLoader());
        }
    }, [location.state, sendRegisterData, startLoader, stopLoader, userData]);

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
                className={classes.wrapper__email}
                rules={[
                    {
                        required: true,
                        message: '',
                        pattern: EMAIL_VALIDATION,
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
                help={isPasswordHelperVisible ? ERRORS_MESSAGES.PASSWORD : ''}
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: PASSWORD_VALIDATION,
                        message: ERRORS_MESSAGES.PASSWORD,
                    },
                ]}
            >
                <Input.Password
                    data-test-id='registration-password'
                    placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                    onChange={() => setPassPlaceholderVisible(false)}
                    style={{ outline: 'none' }}
                    className={classnames(classes.input, classes.antFixed)}
                    onFocus={() => setIsPasswordHelperVisible(true)}
                    iconRender={(visible) => getIconRender(visible)}
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

                            return Promise.reject(new Error(ERRORS_MESSAGES.PASSWORD_CONFIRM));
                        },
                    }),
                ]}
            >
                <Input.Password
                    data-test-id='registration-confirm-password'
                    placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                    style={{ outline: 'none' }}
                    onChange={() => setConfirmPlaceholderVisible(false)}
                    className={classnames(classes.input, classes.antFixed)}
                    iconRender={(visible) => getIconRender(visible)}
                />
            </Form.Item>
            <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                <Button
                    size='large'
                    className={classnames(classes['submit-button'], classes.antFixed)}
                    type='primary'
                    htmlType='submit'
                    block={true}
                    disabled={disabledSubmit}
                    data-test-id='registration-submit-button'
                >
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button
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
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
