import { FC, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { dateDayMonthYearDotFormat } from '@utils/constants/date-formats';
import { Button, DatePicker, Form, Input } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import { ERRORS_MESSAGES } from '../../data/form-messages';

import { CustomUpload } from './components';
import { FieldType, FormPersonalInfoPropsType } from './form-personal-info.types';

import classes from './form-personal-info.module.css';

export const FormPersonalInfo: FC<FormPersonalInfoPropsType> = () => {
    const {
        email: userEmail,
        firstName,
        lastName,
        birthday,
    } = useAppSelector((state) => state.personalInfo);
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(true);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [confirmPlaceholderVisible, setConfirmPlaceholderVisible] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [form] = Form.useForm();

    const handleFormChanged = (values) => {
        if (values.password || values.passwordConfirm) {
            setIsPasswordRequired(true);
        }
        setSubmitDisabled(false);
        console.log(values);
    };

    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Form
            onFieldsChange={handleFormChanged}
            form={form}
            name='personalInfoForm'
            autoComplete='off'
            onFinish={handleSubmit}
            className={classes.form}
        >
            <p className={classes.title}>Личная информация</p>
            <div className={classes.personal}>
                <Form.Item<FieldType> name='uploadFile' className={classes.upload__item}>
                    <CustomUpload setDisabledSaveButton={setSubmitDisabled} />
                </Form.Item>
                <div className={classes.personal__names}>
                    <Form.Item<FieldType> name='userName' className={classes.wrapper__line}>
                        <Input
                            defaultValue={firstName}
                            placeholder='Имя'
                            size='large'
                            style={{ outline: 'none' }}
                            className={classnames(classes.input, classes.antFixed)}
                        />
                    </Form.Item>
                    <Form.Item<FieldType> name='userLastName' className={classes.wrapper__line}>
                        <Input
                            defaultValue={lastName}
                            placeholder='Фамилия'
                            size='large'
                            style={{ outline: 'none' }}
                            className={classnames(classes.input, classes.antFixed)}
                        />
                    </Form.Item>
                    <Form.Item<FieldType> name='userBirthDate' className={classes.wrapper__line}>
                        <DatePicker
                            defaultValue={
                                birthday ? moment(birthday, dateDayMonthYearDotFormat) : undefined
                            }
                            size='large'
                            placeholder='Дата рождения'
                            format={dateDayMonthYearDotFormat}
                            className={classes.birth}
                        />
                    </Form.Item>
                </div>
            </div>
            <p className={classes.title}>Приватность и авторизация</p>
            <div className={classes.privacy}>
                <Form.Item<FieldType>
                    name='email'
                    className={classes.wrapper__line}
                    initialValue={userEmail}
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
                        data-test-id='registration-email'
                        style={{ outline: 'none' }}
                        className={classnames(classes.email, classes.input, classes.antFixed)}
                        addonBefore='e-mail:'
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    className={classes.wrapper__line}
                    help={isPasswordHelperVisible ? ERRORS_MESSAGES.PASSWORD : ''}
                    name='password'
                    rules={[
                        {
                            required: isPasswordRequired,
                            pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
                            message: ERRORS_MESSAGES.PASSWORD,
                        },
                    ]}
                >
                    <Input.Password
                        size='large'
                        autoComplete='off'
                        placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                        onChange={() => {
                            setPassPlaceholderVisible(false);
                        }}
                        style={{ outline: 'none' }}
                        className={classnames(classes.password, classes.input, classes.antFixed)}
                        onFocus={() => {
                            setIsPasswordHelperVisible(true);
                        }}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    name='passwordConfirm'
                    className={classnames(classes.antFixed, classes.wrapper__line)}
                    rules={[
                        {
                            required: isPasswordRequired,
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
                        size='large'
                        autoComplete='off'
                        placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                        style={{ outline: 'none' }}
                        onChange={() => {
                            setConfirmPlaceholderVisible(false);
                        }}
                        className={classnames(classes.confirm, classes.input, classes.antFixed)}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
            </div>
            <Form.Item className={classnames(classes.antFixed, classes.wrapper__line)}>
                <Button
                    size='large'
                    className={classnames(classes.submit, classes.antFixed)}
                    type='primary'
                    htmlType='submit'
                    block={true}
                    disabled={submitDisabled}
                >
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};
