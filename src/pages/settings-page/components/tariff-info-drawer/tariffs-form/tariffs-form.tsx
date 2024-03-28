import { FC, Fragment, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { Button, Form, Radio } from 'antd';

import classes from './tariffs-form.module.css';

type TariffsFormField = {
    selectedTariff: number;
};
type TariffsFormPropsType = {
    //
};

export const TariffsForm: FC<TariffsFormPropsType> = () => {
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const { open: isDrawerOpen, closeDrawer } = useDrawerContext();
    const tariffInfo = useAppSelector((state) => state.tariffsList.tariffs);
    const infoData = tariffInfo && tariffInfo[0] ? tariffInfo[0].periods : [];
    const [form] = Form.useForm();

    if (!isDrawerOpen) {
        form.resetFields();
    }

    const handleSubmit = (values: TariffsFormField) => {
        const selectedDays = values.selectedTariff;
        const tariffId = tariffInfo[0] && tariffInfo[0]._id ? tariffInfo[0]._id : null;
    };

    const handleFieldsChange = () => {
        setDisabledSubmit(false);
    };

    return (
        <Fragment>
            <h4 className={classes.title}>Стоимость тарифа</h4>
            <Form<TariffsFormField>
                form={form}
                name='tariffSelectForm'
                onFinish={handleSubmit}
                onFieldsChange={handleFieldsChange}
                className={classes.form}
            >
                <Form.Item
                    name='selectedTariff'
                    className={classes.radios}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Radio.Group name='tariffsGroup' className={classes.group}>
                        {infoData.map((data) => (
                            <div key={data.text} className={classes.description}>
                                <div className={classes.name}>{data.text}</div>
                                <div className={classes.cost}>{`${data.cost}\u00A0$`}</div>
                                <Radio value={data.days} className={classes.radio} />
                            </div>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item className={classes.submit}>
                    <Button
                        className={classes.button__submit}
                        size='large'
                        type='primary'
                        block={true}
                        htmlType='submit'
                        disabled={disabledSubmit}
                    >
                        Выбрать и оплатить
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};
