import { Form, FormProps, Modal, ModalProps } from "antd";
import { FormInstance } from "antd/es/form/Form";
import React, { ReactNode, useEffect } from "react";

interface AppModalProps extends ModalProps {
  setIsModalOpen: (value: boolean) => void;
  open: boolean;
  onOk: () => void;
  cancelCallback?: () => void;
  enableOverlay?: boolean;
}

interface AppFormProps extends FormProps {
  form: FormInstance;
}

interface DialogFormProps {
  modalProps: AppModalProps;
  children?: ReactNode;
  formProps: AppFormProps;
}

export const ModalForm: React.FC<DialogFormProps> = ({ modalProps, formProps, children }) => {
  const { form, ...restForm } = formProps;
  const { open, setIsModalOpen, cancelCallback, enableOverlay = false, ...restModal } = modalProps;

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    cancelCallback && cancelCallback();
  };

  return (
    <div onContextMenu={(e) => e.stopPropagation()}>
      <Modal
        destroyOnClose
        closable={false}
        onCancel={handleCancel}
        open={open}
        {...{ ...restModal }}
      >
        {open ? (
          <Form {...{ form }} {...{ ...restForm }}>
            {children}
          </Form>
        ) : null}
      </Modal>
    </div>
  );
};
