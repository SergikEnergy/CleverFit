import { FC } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { AllowedTrainResponseType } from '@redux/api/api-types';
import { changeActiveTraining } from '@redux/reducers/trainings-slice';
import { useUserTrainingsSelector } from '@redux/selectors';
import { Tag } from 'antd';

import { defaultTagsData } from './tags-default.data';

import classes from './tags-filter-block.module.css';

const { CheckableTag } = Tag;

export const TagsFilterBlock: FC = () => {
    const dispatch = useAppDispatch();
    const { allowedTrainingsList, activeTrainings } = useUserTrainingsSelector();

    const tagsData =
        allowedTrainingsList.length > 0
            ? defaultTagsData.concat(allowedTrainingsList)
            : defaultTagsData;

    const handleChangeTag = (tag: AllowedTrainResponseType, isChecked: boolean) => {
        if (activeTrainings !== tag.key && isChecked) {
            dispatch(changeActiveTraining(tag.key));
        }
    };

    return (
        <div className={classes.wrapper__tags}>
            <p className={classes.intro}>Тип тренировки:</p>
            <div className={classes.list}>
                {tagsData.map((tag) => (
                    <CheckableTag
                        className={classes.tag}
                        key={tag.key}
                        checked={activeTrainings === tag.key}
                        onChange={(checked) => handleChangeTag(tag, checked)}
                    >
                        {tag.name}
                    </CheckableTag>
                ))}
            </div>
        </div>
    );
};
