import { FC, Fragment, useState } from 'react';
import { SuccessSelectTariff } from '@components/success-select-tariff';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useDrawerContext } from '@hooks/use-info-drawer';
import { useModalReportContext } from '@hooks/use-modal-report';
import { RequestChangeTariffType } from '@redux/api/api-types';
import { useUpdateSelectedTariffMutation } from '@redux/api/settings-api';
import { resetCredentials } from '@redux/reducers/auth-slice';
import { Button, Form, Radio } from 'antd';

import { DATA_TEST_ID } from '../../../../../data/data-test-ids';

import classes from './tariffs-form.module.css';

type TariffsFormField = {
    selectedTariff: number;
};

const SubTitleSuccessChangeTariff: FC = () => {
    const { email } = useAppSelector((state) => state.personalInfo);

    return (
        <div className='tariff-success__change'>
            <span className='tariff-success__change_main'>
                Мы отправили инструкцию для оплаты вам на&nbsp;e-mail <strong>{email}</strong>.
                После подтверждения оплаты войдите в&nbsp;приложение заново.
            </span>
            <span className='tariff-success__change_addon'>
                Не&nbsp;пришло письмо? Проверьте папку Спам.
            </span>
        </div>
    );
};

export const TariffsForm: FC = () => {
    const dispatch = useAppDispatch();
    const { openModal, setNode, setWidthModal, closeModal } = useModalReportContext();
    const [updateTariff] = useUpdateSelectedTariffMutation();
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const { open: isDrawerOpen, closeDrawer } = useDrawerContext();
    const tariffInfo = useAppSelector((state) => state.tariffsList.tariffs);
    const infoData = tariffInfo && tariffInfo[0] ? tariffInfo[0].periods : [];
    const [form] = Form.useForm();

    const handleCloseSuccessWindow = () => {
        closeModal();
        dispatch(resetCredentials());
    };

    if (!isDrawerOpen) {
        form.resetFields();
    }

    const handleSubmit = async (values: TariffsFormField) => {
        setDisabledSubmit(true);
        const selectedDays = values.selectedTariff;

        const tariffId = tariffInfo[0] && tariffInfo[0]._id ? tariffInfo[0]._id : null;

        if (tariffId) {
            const requestBody: RequestChangeTariffType = {
                tariffId,
                days: selectedDays,
            };

            try {
                await updateTariff(requestBody).unwrap();
                setNode(
                    <SuccessSelectTariff
                        closeAction={handleCloseSuccessWindow}
                        title='Чек для оплаты у вас на почте'
                        subTitle={<SubTitleSuccessChangeTariff />}
                    />,
                );
                setWidthModal('clamp(328px, 100%, 539px)');
                openModal();
                closeDrawer();
            } catch (err) {
                //
            } finally {
                setDisabledSubmit(false);
            }
        }
    };

    const handleFieldsChange = () => {
        setDisabledSubmit(false);
    };

    return (
        <Fragment>
            <h4 className={classes.title}>Стоимость тарифа</h4>
            <Form<TariffsFormField>
                data-test-id={DATA_TEST_ID.tariffCost}
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
                                <div className={classes.cost}>
                                    {data.cost.toLocaleString('ru-RU')}&nbsp;$
                                </div>
                                <Radio
                                    value={data.days}
                                    className={classes.radio}
                                    data-test-id={`tariff-${data.cost}`}
                                />
                            </div>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <Form.Item className={classes.submit}>
                    <Button
                        data-test-id={DATA_TEST_ID.tariffSubmit}
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
