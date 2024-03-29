import { forwardRef, useContext, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { DrawerTrainsContext } from '../../../react-contexts';

import { emptyFields } from './form-drawer.data';
import { FormDrawerPropsType, FormFieldsType } from './form-drawer.types';
import { finishFormHandler } from './form-drawer.utils';

import classes from './form-drawer.module.css';

export const FormDrawer = forwardRef<HTMLButtonElement, FormDrawerPropsType>(
    ({ editMode }, ref) => {
        const { exercises, setExercises, trainName } = useContext(DrawerTrainsContext);
        const [deletedIndexes, setDeletedIndexes] = useState<number[]>([]);
        const [form] = Form.useForm<FormFieldsType>();
        const initialFormValuesFiltered =
            exercises.length > 0 ? exercises.filter((elem) => elem.name === trainName) : [];

        const initialFormValues =
            initialFormValuesFiltered.length > 0
                ? initialFormValuesFiltered[0].exercises.map((exercise) => ({
                      key: exercise.name,
                      name: exercise.name,
                      exercise: exercise.name,
                      replays: exercise.replays,
                      weight: exercise.weight,
                      approaches: exercise.approaches,
                  }))
                : [emptyFields];

        const finishFunc = (values: FormFieldsType) => {
            finishFormHandler(values, trainName, setExercises);
            form.resetFields();
        };

        const checkboxChangeHandler = (e: CheckboxChangeEvent, name: number) => {
            if (e.target.checked) {
                setDeletedIndexes((prev) => (prev.includes(name) ? prev : [...prev, name]));
            } else {
                setDeletedIndexes((prev) => prev.filter((elem) => elem !== name));
            }
        };

        return (
            <Form
                form={form}
                layout='vertical'
                name='dynamic_exercises'
                onFinish={finishFunc}
                autoComplete='off'
                initialValues={{ exercises: initialFormValues }}
            >
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
                                                editMode ? (
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
                                    {editMode && (
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
                <Form.Item>
                    <Button ref={ref} htmlType='submit' style={{ display: 'none' }} />
                </Form.Item>
            </Form>
        );
    },
);
