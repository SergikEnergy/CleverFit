import { ChangeEvent, FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changeTrainingsMode } from '@redux/reducers/trainings-partners-slice';
import { Button, Input } from 'antd';

import classes from './search-by-name-block.module.css';

type SearchByNameBlockPropsType = {
    changeSelection: (selected: string) => void;
    action?: () => void;
};

export const SearchByNameBlock: FC<SearchByNameBlockPropsType> = ({
    changeSelection,
    action: actionOnClick,
}) => {
    const dispatch = useAppDispatch();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const trimmedValue = event.target.value.trim();

        changeSelection(trimmedValue);
    };

    const backButtonClickHandler = () => {
        if (actionOnClick) actionOnClick();

        dispatch(changeTrainingsMode('user'));
    };

    const onSearch = (value: string) => changeSelection(value);

    return (
        <div className={classes.search}>
            <Button
                onClick={backButtonClickHandler}
                type='text'
                className={classes.button}
                icon={<ArrowLeftOutlined style={{ fontSize: 12 }} />}
            >
                Назад
            </Button>
            <Input.Search
                onSearch={onSearch}
                placeholder='Поиск по имени'
                onChange={onChange}
                className={classes.input}
            />
        </div>
    );
};
