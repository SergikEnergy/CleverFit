import { FC, ReactNode } from 'react';
import { Result, Button } from 'antd';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';

import classes from './success-select-tariff.module.css';

type SuccessSelectTariffPropsType = {
    title: string | ReactNode | null;
    subTitle: string | ReactNode | null;
    closeAction: () => void;
    extraBlock?: ReactNode | null;
};

export const SuccessSelectTariff: FC<SuccessSelectTariffPropsType> = ({
    title,
    subTitle,
    extraBlock = null,
    closeAction,
}) => (
    <div className={classes.success}>
        <Button
            onClick={() => {
                closeAction();
            }}
            shape='circle'
            className={classes.close}
            type='text'
            icon={<CloseOutlined style={{ fontSize: 14, color: '#8C8C8C' }} />}
        />
        <Result
            className={classes.result}
            icon={<CheckCircleFilled style={{ color: '#2F54EB' }} />}
            title={title}
            subTitle={subTitle}
            extra={extraBlock}
        />
    </div>
);
