import { Button, Col, Form, Input, Modal, Row, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    XIcon,
  } from 'lucide-react'
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';

const AddDonationModal = ({ isOpen, handleCancel, handleOk, selectedItem }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                name: selectedItem.name,
                location: selectedItem.location,
                smallDes: selectedItem.smallDes,
                longDes: selectedItem.longDes,
                help: selectedItem.help,
            });
        } else {
            form.resetFields();
        }
    }, [selectedItem, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (selectedItem) {
                await axios.put(`http://localhost:4000/adDonations/${selectedItem._id}`, values);
                notification.success({ message: 'Update Successful', description: 'Your Advertisement Updated uccessfully.' });
            } else {
                await axios.post('http://localhost:4000/adDonations/create', values);
                notification.success({ message: 'Creation Successful', description: 'Your Advertisement Posted Successfully.' });
            }
            form.resetFields();
            handleOk(); // Close modal & refresh data
        } catch (error) {
            notification.error({ message: 'Error', description: 'Something went wrong. Please try again.' });
            console.error('Error:', error);
        }
        setLoading(false);
    };

    const nameValidation = (_, value) => {
        if (value && /[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return Promise.reject('Name cannot contain numbers or special characters.');
        }
        return Promise.resolve();
    };

    return (
        <Modal
            open={isOpen}
            // onCancel={handleCancel}
            width={700}
            footer={null}
        >
            <div className="modal-container">
                
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Publish Donation Advertisement
          </h2>
          <button
            onClick={handleCancel}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <XIcon size={20} />
          </button>
        </div>

                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleSubmit}
                    style={{ padding: 24, backgroundColor: '#f0f8ff' }}
                    requiredMark={false} 
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Title</b>}
                                rules={[
                                    { required: true, message: "Enter name" },
                                    { validator: nameValidation },
                                ]}
                            >
                                <Input placeholder="Enter name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="location"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Location</b>}
                                rules={[{ required: true, message: "Enter location" }]}
                            >
                                <Input placeholder="Enter location" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="smallDes"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Short Description</b>}
                                rules={[{ required: true, message: "Enter short description" }]}
                            >
                                <Input placeholder="Enter short description" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="help"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Help Required</b>}
                                rules={[{ required: true, message: "Enter help required" }]}
                            >
                                <Input placeholder="Describe required help" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="longDes"
                        label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Detailed Description</b>}
                        rules={[{ required: true, message: "Enter detailed description" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter detailed description" />
                    </Form.Item>

                    <Row justify="end" gutter={16}>
                        <Col>
                            <Button onClick={handleCancel} danger>Cancel</Button>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {selectedItem ? "Update" : "Submit"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default AddDonationModal;