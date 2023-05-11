import React from "react";
import { ModalForm } from "../common/ModalForm";
import { DatePicker, Form, Input, Switch, notification } from "antd";
import { fetchPost } from "../common/fetchHelpers";
import { ADD_DEVICE } from "../app/state";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (val: boolean) => void,
    gatewayId: string,
    dispatch: (action: any) => void,
}

export const DeviceForm: React.FC<Props> = ({ isModalOpen, setIsModalOpen, gatewayId, dispatch }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                notification.info({ message: 'Saving device...' });
                fetchPost('/devices/new', { device: { ...values, status: !!values.status }, gatewayId })
                    .then(async (response) => {
                        if (response.ok) {
                            const device = await response.json();
                            dispatch({ type: ADD_DEVICE, payload: { device, gatewayId } });
                            notification.success({ message: 'Device saved!' });
                            setIsModalOpen(false);
                            form.resetFields();
                        } else {
                            notification.error({ message: 'Something went wrong...' });
                            console.log(response);
                        }
                    });
            })
            .catch((info) => { console.log(info) }
            );
    };

    return (
        <ModalForm
            modalProps={{ open: isModalOpen, setIsModalOpen, onOk: handleOk }}
            formProps={{ form, labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 } }}
        >
            <Form.Item label="UID" name="uid" rules={[{ required: true, message: 'Please input UID!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Vendor" name="vendor" rules={[{ required: true, message: 'Please input vendor!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input date!' }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="Status" name="status">
                <Switch />
            </Form.Item>
        </ModalForm>
    );


};