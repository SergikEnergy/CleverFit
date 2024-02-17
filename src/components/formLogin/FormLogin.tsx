import { FC, useState } from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import classes from './FormLogin.module.css';

type FieldType = {
    userEmail?: string;
    password?: string;
    confirmPassword?: string;
    remember?: string;
};

export const FormLogin: FC = () => {
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [form] = Form.useForm();

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const handleFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    type MouseEventOnClick = React.MouseEvent<HTMLAnchorElement>;

    const handleForgotPassword = (event: MouseEventOnClick) => {
        event.preventDefault();
        console.log(event);
    };

    const handleFormChanged: () => void = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setDisabledSubmit(hasErrors);
    };

    return (
        <Form
            onFieldsChange={handleFormChanged}
            form={form}
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
                    size='large'
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
                        pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/),
                        message: passwordErrorMessage,
                    },
                ]}
            >
                <Input.Password
                    size='large'
                    style={{ outline: 'none' }}
                    className={classnames(classes.input, classes.antFixed)}
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
                    <a className={classes['forgot-link']} href='#' onClick={handleForgotPassword}>
                        Забыли пароль?
                    </a>
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
                    icon={<GooglePlusOutlined />}
                    size='large'
                    className={classnames(classes['google-button'], classes.antFixed)}
                >
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};
