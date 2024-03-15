import { ReactNode, useContext, forwardRef, useState } from 'react';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { Form, Button, Input, InputNumber, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import classes from './FormDrawer.module.css';

interface FormDrawerProps {
    children?: ReactNode;
    editMode: boolean;
}

type FormFieldType = {
    key: string;
    name: string;
    exercise: string;
    replays: number;
    weight: number;
    approaches: number;
};
type FormFieldsType = { exercises: FormFieldType[] };

export const FormDrawer = forwardRef<HTMLButtonElement, FormDrawerProps>(({ editMode }, ref) => {
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
            : [
                  {
                      key: 'empty',
                      name: 'empty',
                      exercise: '',
                      replays: 1,
                      weight: 0,
                      approaches: 1,
                  },
              ];

    const finishFunc = (values: FormFieldsType) => {
        console.log(values);
        if (values.exercises.length > 0) {
            const filteredResult = values.exercises.filter(
                (elem) => elem.exercise && elem.exercise.length > 0,
            );
            if (filteredResult.length > 0) {
                const trainsCorrected = filteredResult.map((train) => {
                    if (!train.approaches) train.approaches = 1;
                    if (!train.replays) train.replays = 1;
                    if (!train.weight) train.weight = 0;
                    train.name = train.exercise;
                    return train;
                });
                setExercises(trainsCorrected, trainName);
            }
        } else {
            setExercises([], trainName);
        }

        form.resetFields();
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
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className={classes['form__element']}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'exercise']}
                                    className={classes.exercise}
                                    noStyle
                                >
                                    <Input
                                        data-test-id={`modal-drawer-right-input-exercise${key}`}
                                        addonAfter={
                                            editMode ? (
                                                <Checkbox
                                                    data-test-id={`modal-drawer-right-checkbox-exercise${key}`}
                                                    className={classes.checkbox}
                                                    onChange={(e: CheckboxChangeEvent) => {
                                                        if (e.target.checked) {
                                                            setDeletedIndexes((prev) =>
                                                                prev.includes(name)
                                                                    ? prev
                                                                    : [...prev, name],
                                                            );
                                                        } else {
                                                            setDeletedIndexes((prev) =>
                                                                prev.filter(
                                                                    (elem) => elem !== name,
                                                                ),
                                                            );
                                                        }
                                                    }}
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
                                            data-test-id={`modal-drawer-right-input-approach${key}`}
                                            type='number'
                                            placeholder='1'
                                            addonBefore={'+'}
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
                                                data-test-id={`modal-drawer-right-input-weight${key}`}
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
                                                data-test-id={`modal-drawer-right-input-quantity${key}`}
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
                                    block
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
                                            deletedIndexes.length !== 0
                                                ? { color: '#000' }
                                                : { color: '#747474' }
                                        }
                                        type='default'
                                        htmlType='button'
                                        size='large'
                                        onClick={() => {
                                            remove(deletedIndexes);
                                            setDeletedIndexes([]);
                                        }}
                                        className={classes.delete}
                                        block
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
});
