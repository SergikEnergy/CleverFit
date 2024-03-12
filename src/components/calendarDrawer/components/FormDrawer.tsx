import { FC, ReactNode, useContext, forwardRef, RefObject } from 'react';
import { DrawerTrainsContext } from '../../../reactContexts/drawerTrains-context';
import { Form, Button, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classes from './FormDrawer.module.css';

interface FormDrawerProps {
    children?: ReactNode;
}

export const FormDrawer = forwardRef<HTMLButtonElement, FormDrawerProps>((props, ref) => {
    const { exercises, trainName, isDrawerOpen } = useContext(DrawerTrainsContext);
    const [form] = Form.useForm();
    const initialFormValuesFiltered = exercises.filter((elem) => elem.name === trainName);
    const initialFormValues =
        initialFormValuesFiltered.length > 0
            ? initialFormValuesFiltered[0].exercises.map((exercise) => ({
                  key: exercise.name,
                  name: exercise.name,
                  exercise: exercise.name,
                  repeat: exercise.replays,
                  weight: exercise.weight,
                  quantity: exercise.approaches,
              }))
            : [
                  {
                      key: 'empty',
                      name: 'empty',
                      exercise: '',
                      repeat: 1,
                      weight: 0,
                      quantity: 1,
                  },
              ];

    // if (!isDrawerOpen) {
    //     form.resetFields();
    // }
    const finishFunc = (values: any) => {
        console.log(values);
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
                {(fields, { add }) => (
                    <div className={classes.wrapper}>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className={classes['form__element']}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'exercise']}
                                    className={classes.exercise}
                                    noStyle
                                >
                                    <Input placeholder='Упражнение' />
                                </Form.Item>
                                <div className={classes.details}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'repeat']}
                                        label='Подходы'
                                        className={classes.repeat}
                                    >
                                        <InputNumber addonBefore={'+'} defaultValue={1} min={1} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'weight']}
                                        label='Вес, кг'
                                        className={classes.weight}
                                    >
                                        <InputNumber defaultValue={0} min={0} addonAfter={'x'} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        label='Количество'
                                        className={classes.quantity}
                                    >
                                        <InputNumber addonBefore={'+'} defaultValue={1} min={1} />
                                    </Form.Item>
                                </div>
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                type='default'
                                htmlType='button'
                                style={{ color: 'blue', width: '60%' }}
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                                Добавить еще
                            </Button>
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
