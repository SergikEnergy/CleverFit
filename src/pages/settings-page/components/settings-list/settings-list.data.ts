import { DATA_TEST_ID } from '../../../../data/data-test-ids';

export type IdButtonType = 'readyForJointTraining' | 'sendNotification';

export const blackThemeKey = 'activate black theme';

export const settingsPropsListDefault = [
    {
        id: 'readyForJointTraining' as IdButtonType,
        key: 'readyForJointTraining',
        info: 'Открыт для совместных тренировок',
        tooltipWidth: 205,
        textHint: 'включеная функция позволит участвовать в\u00A0совместных тренировках',
        checkedSwitch: false,
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffTrainings,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffTrainingsIcon,
    },
    {
        id: 'sendNotification' as IdButtonType,
        key: 'sendNotification',
        info: 'Уведомления',
        tooltipWidth: 220,
        textHint: 'включеная функция позволит получать уведомления об\u00A0активностях',
        checkedSwitch: false,
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffNotifications,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffNotificationsIcon,
    },
    {
        id: 'blackThemeActivate',
        key: blackThemeKey,
        info: 'Тёмная тема',
        tooltipWidth: 115,
        textHint: 'темная тема доступна для PRO\u00A0tarif',
        checkedSwitch: false,
        disabled: false,
        dataTestIdSwitcher: DATA_TEST_ID.tariffTheme,
        dataTestIdIconTooltip: DATA_TEST_ID.tariffThemeIcon,
    },
];
