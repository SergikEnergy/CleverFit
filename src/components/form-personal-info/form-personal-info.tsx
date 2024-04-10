import { FC, Fragment, useEffect, useState } from 'react';
import { ErrorProfile } from '@components/error-profile-page';
import { ERROR_UPDATE_PROFILE } from '@components/error-profile-page/error-messages.data';
import { AlertNotification } from '@components/notifications/alert/alert-notification';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { API_IMGS_BASE } from '@redux/api/api-data';
import { RequestUserInfoType } from '@redux/api/api-types';
import { useUpdateUserInfoMutation } from '@redux/api/profile-api';
import { savePersonalInfoAfterRegistration } from '@redux/reducers/personal-info-slice';
import { usePersonalInfoSelector } from '@redux/selectors';
import { dateDayMonthYearDotFormat, dateFullStringFormat } from '@utils/constants/date-formats';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@utils/constants/patterns-reg-exp';
import { UPLOAD_STATUSES, UploadStatusType } from '@utils/constants/statuses-upload';
import { Button, DatePicker, Form, Input } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import { DATA_TEST_ID } from '../../data/data-test-ids';
import { ERRORS_MESSAGES } from '../../data/form-messages';
import { getIconRender } from '../../helpers/get-password-icon';
import { useModalReportContext } from '../../react-contexts';

import { CustomUpload } from './components';
import { FieldType } from './form-personal-info.types';

import classes from './form-personal-info.module.css';

export const FormPersonalInfo: FC = () => {
    const { openModal, setNode, setWidthModal } = useModalReportContext();
    const {
        email: userEmail,
        firstName,
        lastName,
        birthday,
        url: ImageUrl,
    } = usePersonalInfoSelector();
    const dispatch = useAppDispatch();
    const [updatePersonalInfo] = useUpdateUserInfoMutation();
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(true);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [confirmPlaceholderVisible, setConfirmPlaceholderVisible] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [isAlertShowed, setIsAlertShowed] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<UploadStatusType>(UPLOAD_STATUSES.error);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            email: userEmail,
            firstName,
            lastName,
            birthday: birthday ? moment(birthday, dateFullStringFormat) : undefined,
        });
    }, [birthday, firstName, form, lastName, userEmail]);

    const handleFormChanged = (changedFields: FieldType) => {
        if (changedFields.password || changedFields.passwordConfirm) {
            setIsPasswordRequired(true);
        }
        setSubmitDisabled(false);
    };

    const handleSubmit = async (fieldValues: FieldType) => {
        const requestBody: RequestUserInfoType = {
            email: fieldValues.email,
            password: fieldValues.password,
            firstName: fieldValues.firstName,
            lastName: fieldValues.lastName,
            birthday: fieldValues.birthday,
        };

        Object.keys(fieldValues).map((key) => {
            if (!fieldValues[key as keyof FieldType]) {
                delete requestBody[key as keyof RequestUserInfoType];
            }

            return key;
        });

        if (requestBody.birthday) {
            requestBody.birthday = moment(requestBody.birthday).format(dateFullStringFormat);
        }

        if (uploadStatus === UPLOAD_STATUSES.done && ImageUrl) {
            requestBody.imgSrc = `${API_IMGS_BASE}${ImageUrl}`;
        }

        try {
            const info = await updatePersonalInfo(requestBody).unwrap();

            setIsAlertShowed(true);
            dispatch(savePersonalInfoAfterRegistration(info));
            setSubmitDisabled(true);
            setIsPasswordRequired(false);
        } catch (err) {
            if (err) {
                setNode(
                    <ErrorProfile
                        title={ERROR_UPDATE_PROFILE.title}
                        subTitle={ERROR_UPDATE_PROFILE.subTitle}
                        buttonKey={ERROR_UPDATE_PROFILE.buttonKey}
                        buttonText={ERROR_UPDATE_PROFILE.buttonText}
                    />,
                );
                setWidthModal('clamp(328px, 100%, 416px)');
                openModal();
            }
        }
    };

    return (
        <Fragment>
            <Form
                onValuesChange={handleFormChanged}
                form={form}
                name='personalInfoForm'
                autoComplete='off'
                onFinish={handleSubmit}
                className={classes.form}
            >
                <p className={classes.title}>Личная информация</p>
                <div className={classes.personal}>
                    <CustomUpload
                        setDisabledSaveButton={setSubmitDisabled}
                        setUploadStatus={setUploadStatus}
                    />

                    <div className={classes.personal__names}>
                        <Form.Item<FieldType> name='firstName' className={classes.wrapper__line}>
                            <Input
                                data-test-id={DATA_TEST_ID.profileName}
                                placeholder='Имя'
                                size='large'
                                style={{ outline: 'none' }}
                                className={classnames(classes.input, classes.antFixed)}
                            />
                        </Form.Item>
                        <Form.Item<FieldType> name='lastName' className={classes.wrapper__line}>
                            <Input
                                data-test-id={DATA_TEST_ID.profileSurname}
                                placeholder='Фамилия'
                                size='large'
                                style={{ outline: 'none' }}
                                className={classnames(classes.input, classes.antFixed)}
                            />
                        </Form.Item>
                        <Form.Item<FieldType> name='birthday' className={classes.wrapper__line}>
                            <DatePicker
                                data-test-id={DATA_TEST_ID.profileBirthday}
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
                        rules={[
                            {
                                required: true,
                                message: '',
                                pattern: EMAIL_VALIDATION,
                            },
                        ]}
                    >
                        <Input
                            size='large'
                            data-test-id={DATA_TEST_ID.profileEmail}
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
                                pattern: PASSWORD_VALIDATION,
                                message: ERRORS_MESSAGES.PASSWORD,
                            },
                        ]}
                    >
                        <Input.Password
                            data-test-id={DATA_TEST_ID.profilePassword}
                            size='large'
                            autoComplete='off'
                            placeholder={passPlaceholderVisible ? 'Пароль' : ''}
                            onChange={() => setPassPlaceholderVisible(false)}
                            style={{ outline: 'none' }}
                            className={classnames(
                                classes.password,
                                classes.input,
                                classes.antFixed,
                            )}
                            onFocus={() => setIsPasswordHelperVisible(true)}
                            iconRender={(visible) => getIconRender(visible)}
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

                                    return Promise.reject(
                                        new Error(ERRORS_MESSAGES.PASSWORD_CONFIRM),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            data-test-id={DATA_TEST_ID.profileRepeatPassword}
                            size='large'
                            autoComplete='off'
                            placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                            style={{ outline: 'none' }}
                            onChange={() => setConfirmPlaceholderVisible(false)}
                            className={classnames(classes.confirm, classes.input, classes.antFixed)}
                            iconRender={(visible) => getIconRender(visible)}
                        />
                    </Form.Item>
                </div>
                <Form.Item className={classnames(classes.antFixed, classes.wrapper__line)}>
                    <Button
                        data-test-id={DATA_TEST_ID.profileSubmit}
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
            {isAlertShowed && (
                <AlertNotification
                    dataTestId={DATA_TEST_ID.alert}
                    type='success'
                    message='Данные профиля успешно обновлены'
                    handleCloseAlert={() => setIsAlertShowed(false)}
                />
            )}
        </Fragment>
    );
};
