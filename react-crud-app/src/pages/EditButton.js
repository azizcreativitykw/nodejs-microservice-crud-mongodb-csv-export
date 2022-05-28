import {useEffect, useState} from "react";
import { Button, Form, Input, Select,Modal } from 'antd';
import {openNotificationWithIcon, updateData} from "../utility";
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const EditButton = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const {data} = props;

    const [form] = Form.useForm();

    useEffect(()=>{
        fillForm()
    }, [])

    const onFinish = async (values) => {
        values._id = data?._id;
        console.log(values);
        try {
            let {status, data} = await updateData('/users', values);
            props.onPress();
            if (status === 200) {
                openNotificationWithIcon('success', 'Success',data.msg);
                setModalVisible(false)
            } else {
                openNotificationWithIcon('warning', 'Warning', 'Something went wrong.')
            }
        } catch (e) {
            openNotificationWithIcon('error', 'Error',e.toString())
        }
    };


    const fillForm = () => {
        form.setFieldsValue({
            name : data?.name,
            email: data?.email,
            gender: data?.gender,
            status: data?.status
        });
    };


    return(
        <>
            <a onClick={() => setModalVisible(true)}>Edit</a>

            <Modal
                title="Edit"
                centered
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select your gender."
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select active status"
                            allowClear
                        >
                            <Option value="active">active</Option>
                            <Option value="inactive">inactive</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}

export default EditButton;
