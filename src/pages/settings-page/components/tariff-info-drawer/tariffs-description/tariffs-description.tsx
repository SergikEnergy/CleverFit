import { FC } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-size';
import classnames from 'classnames';

import { CurrentTariffInfo } from '../cyrrent-tariff-info/current-tariff-info';
import { TariffLineInfo } from '../tariff-info-line/tariff-line-info';

import { tariffsDescriptionsData } from './tariff-descriptions.data';

import classes from './tariffs-description.module.css';

type TariffsDescriptionPropsType = {
    isPaid: boolean;
    untilPaid: string;
};

export const TariffsDescription: FC<TariffsDescriptionPropsType> = ({ isPaid, untilPaid }) => {
    const innerWindowWidth = useWindowWidth();

    return (
        <div className={classes.info}>
            {isPaid && <CurrentTariffInfo date={`до ${untilPaid}`} />}
            <div className={classes.title}>
                <span className={classes.label}>FREE</span>
                <span className={classnames(classes.label, classes.pro)}>
                    PRO
                    {isPaid && (
                        <CheckCircleOutlined
                            style={{
                                color: '#52C41A',
                                marginRight: 1,
                                fontSize: innerWindowWidth > 500 ? 14 : 12,
                            }}
                        />
                    )}
                </span>
            </div>
            {tariffsDescriptionsData.map((prop) => (
                <TariffLineInfo {...prop} />
            ))}
        </div>
    );
};
