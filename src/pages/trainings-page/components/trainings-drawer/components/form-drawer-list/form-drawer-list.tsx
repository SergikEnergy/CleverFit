import { FC, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { DRAWER_EDIT_MODE, DRAWER_JOIN_MODE } from '@utils/constants/train-modes';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { useTrainingsDrawerContext } from '../../../../../../react-contexts';

import classes from './form-drawer-list.module.css';

export const FormDrawerList: FC = () => {
    const [deletedIndexes, setDeletedIndexes] = useState<number[]>([]);
    const { modeDrawer } = useTrainingsDrawerContext();
    const isEditMode = modeDrawer === DRAWER_EDIT_MODE || modeDrawer === DRAWER_JOIN_MODE;

    const checkboxChangeHandler = (e: CheckboxChangeEvent, name: number) => {
        if (e.target.checked) {
            setDeletedIndexes((prev) => (prev.includes(name) ? prev : [...prev, name]));
        } else {
            setDeletedIndexes((prev) => prev.filter((elem) => elem !== name));
        }
    };

    return (
        <Form.List name='exercises'>
            {(fields, { add, remove }) => (
                <div className={classes.wrapper}>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className={classes.form__element}>
                            <Form.Item
                                {...restField}
                                name={[name, 'exercise']}
                                className={classes.exercise}
                                noStyle={true}
                            >
                                <Input
                                    data-test-id={`modal-drawer-right-input-exercise${index}`}
                                    addonAfter={
                                        isEditMode ? (
                                            <Checkbox
                                                data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                className={classes.checkbox}
                                                onChange={(event: CheckboxChangeEvent) =>
                                                    checkboxChangeHandler(event, name)
                                                }
                                            />
                                        ) : null
                                    }
                                    placeholder='Упражнение'
                                />
                            </Form.Item>
                            <div className={classes.details}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'repeat']}
                                    label='Подходы'
                                    className={classes.repeat}
                                >
                                    <InputNumber
                                        data-test-id={`modal-drawer-right-input-approach${index}`}
                                        type='number'
                                        placeholder='1'
                                        addonBefore='+'
                                        min={1}
                                    />
                                </Form.Item>
                                <div className={classes.correct}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'weight']}
                                        label='Вес, кг'
                                        className={classes.weight}
                                    >
                                        <InputNumber
                                            data-test-id={`modal-drawer-right-input-weight${index}`}
                                            type='number'
                                            placeholder='0'
                                            min={0}
                                        />
                                    </Form.Item>
                                    <div className={classes.sign}>x</div>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'approaches']}
                                        label='Количество'
                                        className={classes.quantity}
                                    >
                                        <InputNumber
                                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                                            type='number'
                                            placeholder='1'
                                            min={1}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Form.Item className={classes.add}>
                        <div className={classes.controls}>
                            <Button
                                block={true}
                                type='default'
                                htmlType='button'
                                size='large'
                                style={{ color: 'blue' }}
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                                Добавить ещё
                            </Button>
                            {isEditMode && (
                                <Button
                                    style={
                                        deletedIndexes.length === 0
                                            ? { color: '#747474' }
                                            : { color: '#000' }
                                    }
                                    type='default'
                                    htmlType='button'
                                    size='large'
                                    onClick={() => {
                                        remove(deletedIndexes);
                                        setDeletedIndexes([]);
                                    }}
                                    className={classes.delete}
                                    block={true}
                                    icon={<MinusOutlined />}
                                    disabled={deletedIndexes.length === 0}
                                >
                                    Удалить
                                </Button>
                            )}
                        </div>
                    </Form.Item>
                </div>
            )}
        </Form.List>
    );
};
