import { FC, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-size';
import { Switch, Tooltip } from 'antd';
import classnames from 'classnames';

import { IdButtonType } from '../settings-list/settings-list.data';

import classes from './settings-item.module.css';

type SettingsItemPropsType = {
    info: string;
    id: IdButtonType | string;
    tooltipWidth: string | number;
    textHint: string;
    checkedSwitch: boolean;
    disabled?: boolean;
    onChangeHandler?: (checked: boolean, id: string) => Promise<void>;
};

export const SettingsItem: FC<SettingsItemPropsType> = ({
    info,
    textHint,
    tooltipWidth,
    checkedSwitch,
    onChangeHandler,
    id,
    disabled = false,
}) => {
    const windowWidth = useWindowWidth();
    const [disabledSwitcher, setIsDisabledSwitcher] = useState(disabled);

    const onChangeSwitcher = async (checked: boolean) => {
        if (onChangeHandler) {
            setIsDisabledSwitcher(true);
            await onChangeHandler(checked, id);
            setIsDisabledSwitcher(false);
        }
    };

    return (
        <div className={classes.item}>
            <div className={classes.content}>
                <p className={classnames(classes.text, { [classes.disabled]: disabledSwitcher })}>
                    {info}
                </p>
                <Tooltip
                    destroyTooltipOnHide={true}
                    align={{ offset: [-16, -5] }}
                    placement={windowWidth > 500 ? 'bottomLeft' : 'topRight'}
                    overlayStyle={{ width: tooltipWidth }}
                    title={textHint}
                    color='black'
                    className={classes.tooltip}
                >
                    <ExclamationCircleOutlined style={{ color: '#8C8C8C' }} />
                </Tooltip>
            </div>
            <Switch
                checked={checkedSwitch}
                onChange={onChangeSwitcher}
                disabled={disabledSwitcher}
                className={classes.switch}
            />
        </div>
    );
};
