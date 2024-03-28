import { DATA_TEST_ID } from '../../../../data/data-test-ids';

export type IdButtonType = 'readyForJointTraining' | 'sendNotification';
type SettingsPropListType = {
    id: IdButtonType | typeof blackThemeKey;
    key: string;
    info: string;
    tooltipWidth: number;
    textHint: string;
    onChangeHandler: (checked: boolean, id: IdButtonType | typeof blackThemeKey) => Promise<void>;
    disabled: boolean;
    dataTestIdSwitcher: string;
    dataTestIdIconTooltip: string;
};

export const blackThemeKey = 'activate black theme';
export const readyForJointTrainingKey = 'readyForJointTraining';
export const sendNotificationKey = 'sendNotification';

export const settingsPropsListDefault: SettingsPropListType[] = [
    {
        id: readyForJointTrainingKey as IdButtonType,
        key: readyForJointTrainingKey,
        info: 'Открыт для совместных тренировок',
        tooltipWidth: 205,
        textHint: 'включеная функция позволит участвовать в\u00A0совместных тренировках',
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffTrainings,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffTrainingsIcon,
        onChangeHandler: async () => {},
    },
    {
        id: sendNotificationKey as IdButtonType,
        key: sendNotificationKey,
        info: 'Уведомления',
        tooltipWidth: 220,
        textHint: 'включеная функция позволит получать уведомления об\u00A0активностях',
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffNotifications,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffNotificationsIcon,
        onChangeHandler: async () => {},
    },
    {
        id: blackThemeKey,
        key: blackThemeKey,
        info: 'Тёмная тема',
        tooltipWidth: 115,
        textHint: 'темная тема доступна для PRO\u00A0tarif',
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffTheme,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffThemeIcon,
        onChangeHandler: async () => {},
    },
];
