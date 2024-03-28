import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { RequestUserInfoType } from '@redux/api/api-types';
import { useUpdateUserInfoMutation } from '@redux/api/profile-api';
import { updateReadyForTrain, updateSendNotification } from '@redux/reducers/personal-info-slice';

import { SettingsItem } from '../settings-item';

import {
    blackThemeKey,
    IdButtonType,
    readyForJointTrainingKey,
    sendNotificationKey,
    settingsPropsListDefault,
} from './settings-list.data';

import classes from './settings-list.module.css';

export const SettingsList: FC = () => {
    const dispatch = useAppDispatch();
    const { readyForJointTraining, sendNotification, email } = useAppSelector(
        (state) => state.personalInfo,
    );
    const userTariff = useAppSelector((state) => state.personalInfo.tariff);
    const allTariffs = useAppSelector((state) => state.tariffsList.tariffs);
    const isPaidPro = !allTariffs.some((tariff) => tariff._id === userTariff?.tariffId);
    const [updateUserInfo] = useUpdateUserInfoMutation();

    const onChangeHandler = async (checked: boolean, id: IdButtonType | string) => {
        try {
            if (id !== blackThemeKey) {
                const body: RequestUserInfoType = { email };

                body[id as IdButtonType] = checked;
                if (id === sendNotificationKey) {
                    dispatch(updateSendNotification({ sendNotification: checked }));
                } else {
                    dispatch(updateReadyForTrain({ readyForJointTraining: checked }));
                }

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

                if (item.id === blackThemeKey) {
                    return (
                        <SettingsItem
                            {...props}
                            disabled={isPaidPro}
                            checkedSwitcher={false}
                            onChangeHandler={async () => {}}
                        />
                    );
                }
                if (item.id === readyForJointTrainingKey) {
                    return (
                        <SettingsItem
                            {...props}
                            checkedSwitcher={readyForJointTraining}
                            onChangeHandler={onChangeHandler}
                        />
                    );
                }
                if (item.id === sendNotificationKey) {
                    return (
                        <SettingsItem
                            {...props}
                            checkedSwitcher={sendNotification}
                            onChangeHandler={onChangeHandler}
                        />
                    );
                }

                return undefined;
            })}
        </section>
    );
};
