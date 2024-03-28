import { FC } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RequestUserInfoType } from '@redux/api/api-types';
import { useUpdateUserInfoMutation } from '@redux/api/profile-api';
import { dateFullStringFormat } from '@utils/constants/date-formats';
import moment from 'moment';

import { SettingsItem } from '../settings-item';

import { blackThemeKey, IdButtonType, settingsPropsListDefault } from './settings-list.data';

import classes from './settings-list.module.css';

export const SettingsList: FC = () => {
    const { readyForJointTraining, sendNotification, email } = useAppSelector(
        (state) => state.personalInfo,
    );
    const expired = useAppSelector((state) => state.personalInfo.tariff?.expired) || undefined;
    const isPaidPro = expired ? moment(expired, dateFullStringFormat).isAfter(moment()) : false;
    const [updateUserInfo] = useUpdateUserInfoMutation();

    const onChangeHandler = async (checked: boolean, id: IdButtonType | string) => {
        try {
            const body: RequestUserInfoType = { email };

            body[id as IdButtonType] = checked;

            if (body[id as IdButtonType]) {
                await updateUserInfo(body).unwrap();
            }
        } catch (err) {
            //
        }
    };

    return (
        <section className={classes.list}>
            {settingsPropsListDefault.map((item) => {
                const props = { ...item };

                if (item.key === blackThemeKey) {
                    props.disabled = isPaidPro;
                } else if (item.key === 'readyForJointTraining') {
                    props.checkedSwitch = readyForJointTraining;
                } else if (item.key === 'sendNotification') {
                    props.checkedSwitch = sendNotification;
                }

                return <SettingsItem {...props} onChangeHandler={onChangeHandler} />;
            })}
        </section>
    );
};
