import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, notification, Typography } from 'antd';
import axios from 'axios';
import {
    XIcon,
  } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const UpdateAd = ({handleCancel}) => {
    const { _id } = useParams();
    const navigate = useNavigate();
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/adDonations/${_id}`)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch(() => {
                notification.error({ message: "Failed to load advertisement details" });
            });
    }, [_id, form]);

    const handleUpdate = async () => {
        setLoading(true);
        form.validateFields()
            .then(values => {
                return axios.put(`http://localhost:4000/adDonations/${_id}`, values);
            })
            .then(() => {
                notification.success({ message: "Advertisement updated successfully!" });
                navigate('/showAds');
            })
            .catch(() => {
                notification.error({ message: "Failed to update advertisement" });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Modal
            title={<Title level={3} style={{ marginBottom: 0, color:'white' }}>Update Advertisement</Title>}
            open={true}
            onCancel={() => navigate('/showAds')}
            footer={null}
            width={700}
            requiredMark={false} 
        >
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            Update Donation Advertisement
          </h2>
          
        </div>
            <Form form={form} layout="vertical" style={{ padding: 24, backgroundColor: '#f0f8ff' }}
                    requiredMark={false} >
                <Form.Item name="name"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Title</b>}
                                rules={[
                                    { required: true, message: "Enter name" }]}>                    
                    <Input placeholder="Enter advertisement name" />
                </Form.Item>
                <Form.Item name="location"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Location</b>}
                                rules={[{ required: true, message: "Enter location" }]}>                    
                    <Input placeholder="Enter location" />
                </Form.Item>

                <Form.Item name="smallDes"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Short Description</b>}
                                rules={[{ required: true, message: "Enter short description" }]}>                    
                    <Input placeholder="Enter short description" />
                </Form.Item>

                <Form.Item name="longDes"
                        label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Detailed Description</b>}
                        rules={[{ required: true, message: "Enter detailed description" }]}>                    
                    <TextArea rows={4} placeholder="Enter detailed description" />
                </Form.Item>

                <Form.Item name="help"
                                label={<b style={{ fontSize: '16px', fontWeight: 500 }}>Help Required</b>}
                                rules={[{ required: true, message: "Enter help required" }]}>                    
                    <Input placeholder="Enter required help" />
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                    <Button onClick={() => navigate('/showAds')} style={{ marginRight: 8 }}>Cancel</Button>
                    <Button type="primary" loading={loading} onClick={handleUpdate}>Update</Button>
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateAd;
