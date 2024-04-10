import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { usePartnersSelector } from '@redux/selectors';
import { getColorTrainByName } from '@utils/get-color-badge-by-name';
import { Avatar, Badge } from 'antd';

import { useTrainingsDrawerContext } from '../../react-contexts';

import classes from './partner-training-short-info.module.css';

export const PartnerTrainingShortInfo: FC = () => {
    const { activePartnerTrainingId } = useTrainingsDrawerContext();
    const { randomPartners, similarPartners } = usePartnersSelector();

    const randomUser = randomPartners.filter((user) => user.id === activePartnerTrainingId)[0];
    const similarUser = similarPartners.filter((user) => user.id === activePartnerTrainingId)[0];
    const selectedUser = randomUser || similarUser || null;

    return (
        selectedUser && (
            <div className={classes.info}>
                <div className={classes.user}>
                    <div className={classes.avatar}>
                        {selectedUser.imageSrc ? (
                            <Avatar src={selectedUser.imageSrc} />
                        ) : (
                            <UserOutlined style={{ fontSize: 32 }} />
                        )}
                    </div>
                    <div className={classes.name}>{selectedUser.name}</div>
                </div>

                <div className={classes.badge}>
                    <Badge
                        color={getColorTrainByName(selectedUser.trainingType)}
                        text={selectedUser.trainingType}
                    />
                </div>
            </div>
        )
    );
};
