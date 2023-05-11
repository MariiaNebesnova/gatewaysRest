import React from "react";
import { ModalForm } from "../common/ModalForm";
import { Form, Input, notification } from "antd";
import { fetchPost } from "../common/fetchHelpers";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (val: boolean) => void,
}

export const GatewayForm: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                notification.info({ message: 'Saving gateway...' });
                fetchPost('/gateways/new', values)
                    .then((response) => {
                        if (response.ok) {
                            notification.success({ message: 'Gateway saved!' });
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
            <Form.Item label="Serial Number" name="serialNumber" rules={[{ required: true, message: 'Please input serial number!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="IPv4" name="ipv4" rules={[{ required: true, message: 'Please input IP address!' }]}>
                <Input />
            </Form.Item>
        </ModalForm>
    );
};