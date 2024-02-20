import { FC, useState } from 'react';

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

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
    const matchedErrorMessage = 'Пароль не совпадают';

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const handleFailed = (errorInfo: any) => {
        console.log(errorInfo);
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
            onFinishFailed={handleFailed}
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
