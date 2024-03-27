import { FC, Fragment, useContext } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { history } from '@redux/configure-store';
import { Button } from 'antd';
import classnames from 'classnames';

import { DATA_TEST_ID } from '../../../data/data-test-ids';
import { CollapsedContext } from '../../../react-contexts';
import { Paths } from '../../../routes/pathes';

import classes from './settings-button.module.css';

type SettingsButtonPropsType = {
    hiddenForCalendar?: boolean;
    forProfile?: boolean;
};

export const SettingsButton: FC<SettingsButtonPropsType> = ({ hiddenForCalendar, forProfile }) => {
    const { collapsed } = useContext(CollapsedContext);

    const handleClick = () => {
        history.push(Paths.SETTINGS_PAGE);
    };

    return (
        <Fragment>
            <Button
                onClick={handleClick}
                data-test-id={DATA_TEST_ID.headerSettings}
                className={classnames(classes.mobile__button, classes.antFixed, {
                    [classes['calendar-mobile']]: hiddenForCalendar,
                    [classes.mobile__button_profile]: forProfile,
                })}
                type='text'
                shape='circle'
                icon={<SettingOutlined />}
            />

            <Button
                onClick={handleClick}
                data-test-id={DATA_TEST_ID.headerSettings}
                className={classnames(classes.settings__button, {
                    [classes.settings__button_profile]: forProfile,
                })}
                type='text'
                icon={<SettingOutlined />}
            >
                <span
                    className={classnames(classes.button__text, {
                        [classes.collapsed]: collapsed,
                    })}
                >
                    Настройки
                </span>
            </Button>
        </Fragment>
    );
};
