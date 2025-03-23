import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Col,
    Typography,
    Card
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import CustomRow from "../../common/Form_header";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Title } = Typography;
const dateFormat = 'YYYY-MM-DD';

const AddEvent = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = async (values) => {
        const { eventNo, eventName, eventPlace, eventDate, eventDetails } = values;
        const EventSchema = { eventNo, eventName, eventPlace, eventDate, eventDetails };

        Modal.confirm({
            title: 'Confirm Event Addition',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to add this event?',
            async onOk() {
                try {
                    await axios.post("http://localhost:4000/event/addevent", EventSchema);
                    window.location.reload(false);
                } catch (err) {
                    alert("Error adding event!");
                    console.log(err);
                }
            },
            onCancel() {
                console.log("Cancelled");
            }
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            <Card style={{ maxWidth: 700, width: '100%', padding: '24px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <CustomRow style={{ justifyContent: "center", marginBottom: "20px" }}>
                    <Title level={2} style={{ color: "#37475E", fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", paddingBottom: "10px", borderBottom: "3px solid #37475E", display: "inline-block" }}>
                        Add Event
                    </Title>
                </CustomRow>
                <Form 
                    name="add-event" 
                    onFinish={handleSubmit} 
                    layout="vertical"
                    style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    <Form.Item 
                        name="eventNo" 
                        label="Event No" 
                        rules={[{ required: true, message: 'Event No is required!' }]} 
                    >
                        <Input placeholder="Enter Event No" />
                    </Form.Item>
                    
                    <Form.Item 
                        name="eventName" 
                        label="Event Name" 
                        rules={[{ required: true, message: 'Event Name is required!' }]} 
                    >
                        <Input placeholder="Enter Event Name" />
                    </Form.Item>
                    
                    <Form.Item 
                        name="eventPlace" 
                        label="Event Location" 
                        rules={[{ required: true, message: 'Event Location is required!' }]} 
                    >
                        <Input placeholder="Enter Event Location" />
                    </Form.Item>
                    
                    <Form.Item 
                        name="eventDate" 
                        label="Event Date" 
                        rules={[{ required: true, message: 'Event Date is required!' }]} 
                    >
                        <DatePicker format={dateFormat} style={{ width: '100%' }} />
                    </Form.Item>
                    
                    <Form.Item 
                        name="eventDetails" 
                        label="Event Description" 
                        rules={[{ required: true, message: 'Event Description is required!' }]} 
                    >
                        <Input.TextArea rows={4} placeholder="Enter Event Description" />
                    </Form.Item>
                    
                    <Form.Item style={{ marginTop: '20px' }}>
                        <Row gutter={10} justify="center">
                            <Col>
                                <Button type="primary" htmlType="submit" style={{ width: '120px' }}>
                                    Submit
                                </Button>
                            </Col>
                            <Col>
                                <Button htmlType="reset" style={{ width: '120px', backgroundColor: '#f0f0f0', color: '#37475E' }}>
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddEvent;