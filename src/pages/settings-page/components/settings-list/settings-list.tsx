import { FC, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RequestUserInfoType } from '@redux/api/api-types';
import { useUpdateUserInfoMutation } from '@redux/api/profile-api';

import { SettingsItem } from '../settings-item';

import { blackThemeKey, IdButtonType, settingsPropsListDefault } from './settings-list.data';

import classes from './settings-list.module.css';

export const SettingsList: FC = () => {
    const [disabledTheme, setDisabledTheme] = useState(true);
    const { readyForJointTraining, sendNotification, email } = useAppSelector(
        (state) => state.personalInfo,
    );
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
                    props.disabled = disabledTheme;
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
