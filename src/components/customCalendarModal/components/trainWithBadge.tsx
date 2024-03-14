import { FC, useContext } from 'react';
import { ITrainingsResponse } from '@redux/API/api-types';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { Badge } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getColorTrainByName } from '@components/calendarWithData/CalendarWithData.utils';

import classes from './TrainWithBadge.module.css';

interface TrainWithBadgeProps {
    train: ITrainingsResponse;
    changeFlowToEdit: () => void;
}

export const TrainWithBadge: FC<TrainWithBadgeProps> = ({ train, changeFlowToEdit }) => {
    const { changeEditedTrainData } = useContext(DrawerTrainsContext);
    const handleEditClick = () => {
        changeEditedTrainData(train._id, train.name);
        changeFlowToEdit();
    };

    return (
        <li className={classes.train}>
            <Badge
                className={classes.badge}
                color={getColorTrainByName(train.name)}
                text={train.name}
            />
            <EditOutlined
                onClick={handleEditClick}
                style={{ color: 'blue' }}
                className={classes.highlighter}
            />
        </li>
    );
};
