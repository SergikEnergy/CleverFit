import { FC } from 'react';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import classes from './tariff-line-info.module.css';

type TariffLineInfoPropsType = {
    description: string;
    insideFree: boolean;
    insidePro: boolean;
};

export const TariffLineInfo: FC<TariffLineInfoPropsType> = ({
    description,
    insideFree,
    insidePro,
}) => (
    <div className={classes.line}>
        <div className={classes.description}>{description}</div>
        <div className={classes.sign}>
            {insideFree ? (
                <CheckCircleFilled style={{ color: '#262626', fontSize: 18 }} />
            ) : (
                <CloseCircleOutlined style={{ color: '#BFBFBF', fontSize: 18 }} />
            )}
        </div>
        <div className={classes.sign}>
            {insidePro ? (
                <CheckCircleFilled style={{ color: '#262626', fontSize: 18 }} />
            ) : (
                <CloseCircleOutlined style={{ color: '#BFBFBF', fontSize: 18 }} />
            )}
        </div>
    </div>
);
