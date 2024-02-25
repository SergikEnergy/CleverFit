import { FC, useState, useContext, useEffect } from 'react';
import { LoaderStateContext } from '../../../reactContexts/loader-context';
import { useChangePasswordMutation } from '@redux/API/authAPI';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Paths } from '../../../routes/pathes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { saveRegistrationData, removeRegistrationData } from '@redux/reducers/userSlice';

import { Form, Input, Button } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import classes from './changePasswordPage.module.css';
import classnames from 'classnames';

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
    } = useAppSelector((state) => state.user);
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

    useEffect(() => {
        if (location.state?.fromPath && location.state.fromPath === Paths.ERROR_CHANGE_PASSWORD) {
            startLoader();
            sendChangePasswordRequest(userPassword, userConfirmPassword as string).finally(() =>
                stopLoader(),
            );
        }
    }, []);

    const handleSubmit = async (values: RebootPassFieldType) => {
        const dataForRequest = {
            password: values.password as string,
            confirmPassword: values.confirmPassword as string,
        };

        await sendChangePasswordRequest(dataForRequest.password, dataForRequest.confirmPassword);
    };

    const sendChangePasswordRequest = async (password: string, confirmPassword: string) => {
        try {
            const response = await changeUserPassword({ password, confirmPassword }).unwrap();
            if (response) {
                history.push(Paths.SUCCESS_CHANGE_PASSWORD, { fromPath: location.pathname });
                dispatch(removeRegistrationData());
            }
        } catch (error) {
            dispatch(saveRegistrationData({ email: userEmail, password, confirmPassword }));
            history.push(Paths.ERROR_CHANGE_PASSWORD, { fromPath: location.pathname });
        }
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
                            pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
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
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
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
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                    <Button
                        data-test-id='change-submit-button'
                        size='large'
                        className={classnames(classes['submit-button'], classes.antFixed)}
                        type='primary'
                        htmlType='submit'
                        block
                        disabled={disabledSubmit}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
