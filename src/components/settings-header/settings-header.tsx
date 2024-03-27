import { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '@redux/configure-store';
import { Button } from 'antd';
import classnames from 'classnames';

import { DATA_TEST_ID } from '../../data/data-test-ids';

import classes from './settings-header.module.css';

export const SettingsHeader: FC = () => {
    const handleClick = () => {
        history.back();
    };

    return (
        <header className={classes.header}>
            <div className={classnames(classes.header__wrapper, 'wrapper')}>
                <div className={classes.button}>
                    <Button
                        data-test-id={DATA_TEST_ID.settingsBack}
                        onClick={handleClick}
                        icon={<ArrowLeftOutlined style={{ color: 'black', fontSize: 12 }} />}
                        htmlType='button'
                        type='text'
                    >
                        Настройки
                    </Button>
                </div>
            </div>
        </header>
    );
};
