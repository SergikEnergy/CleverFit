import { FC, useContext } from 'react';

import { CollapsedContext } from '../../reactContexts/collapse-context';
import { Button, Divider } from 'antd';
import { AppleFilled, AndroidFilled } from '@ant-design/icons';

import classes from './phoneDownload.module.css';

export const PhoneDownload: FC = () => {
    const { collapsed } = useContext(CollapsedContext);
    return (
        <div className={classes.download}>
            <div
                className={
                    !collapsed
                        ? `${classes.description}`
                        : `${classes.description} ${classes.collapsed}`
                }
            >
                <div className={classes.title}>Скачать на телефон </div>
                <div className={classes.text}>Доступно в PRO-тарифе</div>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.actions}>
                <div className={classes.button}>
                    <Button type='text' icon={<AndroidFilled />}>
                        Android OS
                    </Button>
                </div>
                <div className={classes.button}>
                    <Button type='text' icon={<AppleFilled />}>
                        Apple iOS
                    </Button>
                </div>
            </div>
        </div>
    );
};
