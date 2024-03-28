import { FC } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-size';
import { Switch, Tooltip } from 'antd';
import classnames from 'classnames';

import { blackThemeKey, IdButtonType } from '../settings-list/settings-list.data';

import classes from './settings-item.module.css';

type SettingsItemPropsType = {
    info: string;
    id: IdButtonType | string;
    tooltipWidth: string | number;
    textHint: string;
    checkedSwitcher: boolean;
    onChangeHandler: (checked: boolean, id: string) => Promise<void>;
    dataTestIdSwitcher?: string;
    dataTestIdIconTooltip?: string;
    disabled?: boolean;
};

export const SettingsItem: FC<SettingsItemPropsType> = ({
    info,
    textHint,
    tooltipWidth,
    checkedSwitcher,
    onChangeHandler,
    id,
    dataTestIdSwitcher,
    dataTestIdIconTooltip,
    disabled = false,
}) => {
    const windowWidth = useWindowWidth();

    const onChangeSwitcher = (checked: boolean) => {
        if (id !== blackThemeKey) {
            onChangeHandler(checked, id);
        }
    };

    return (
        <div className={classes.item}>
            <div className={classes.content}>
                <p className={classnames(classes.text, { [classes.disabled]: disabled })}>{info}</p>
                <Tooltip
                    destroyTooltipOnHide={true}
                    align={windowWidth > 500 ? { offset: [-16, -5] } : { offset: [16, 5] }}
                    placement={windowWidth > 500 ? 'bottomLeft' : 'topRight'}
                    overlayStyle={{ width: tooltipWidth }}
                    title={textHint}
                    color='black'
                    className={classes.tooltip}
                >
                    <ExclamationCircleOutlined
                        data-test-id={dataTestIdIconTooltip}
                        style={{ color: '#8C8C8C' }}
                    />
                </Tooltip>
            </div>
            <Switch
                data-test-id={dataTestIdSwitcher}
                checked={checkedSwitcher}
                onChange={onChangeSwitcher}
                disabled={disabled}
                className={classes.switch}
            />
        </div>
    );
};
