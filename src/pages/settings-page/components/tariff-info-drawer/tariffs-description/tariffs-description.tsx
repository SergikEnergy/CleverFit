import { FC } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { CurrentTariffInfo } from '../cyrrent-tariff-info/current-tariff-info';
import { TariffLineInfo } from '../tariff-info-line/tariff-line-info';

import { tariffsDescriptionsData } from './tariff-descriptions.data';

import classes from './tariffs-description.module.css';

export const TariffsDescription: FC = () => (
    <div className={classes.info}>
        <CurrentTariffInfo date='past date here' />
        <div className={classes.title}>
            <span className={classes.label}>FREE</span>
            <span className={classnames(classes.label, classes.pro)}>
                PRO
                <CheckCircleOutlined style={{ color: '#52C41A', marginRight: 1, fontSize: 14 }} />
            </span>
        </div>
        {tariffsDescriptionsData.map((prop) => (
            <TariffLineInfo {...prop} />
        ))}
    </div>
);
