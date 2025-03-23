//import './UpdateEvent.css'; // Add this line to import the external CSS
import { Button, DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from 'dayjs';
dayjs.extend(require("dayjs/plugin/customParseFormat"));

const UpdateEvent = () => {
    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");

    const { id } = useParams();

    const getEventDetails = () => {
        axios.get(`http://localhost:4000/event/get/${id}`)
            .then((res) => {
                const { eventNo, eventName, eventPlace, eventDetails, eventDate } = res.data.Event;
                seteventNo(eventNo);
                seteventName(eventName);
                seteventPlace(eventPlace);
                seteventDetails(eventDetails);
                seteventDate(eventDate);
            })
            .catch((err) => alert(err.message));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { eventNo, eventName, eventPlace, eventDetails, eventDate };
        Modal.confirm({
            title: 'Do you want to update this event?',
            icon: <ExclamationCircleFilled />,
            content: 'Click OK to confirm the update.',
            async onOk() {
                try {
                    await axios.put(`http://localhost:4000/event/update/${id}`, newEvent);
                } catch (err) {
                    alert(err.message);
                }
            },
            onCancel() {
                console.log("Update canceled");
            }
        });
    };

    useEffect(() => getEventDetails(), []);

    const onChange = (date, dateString) => seteventDate(dateString);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            <div style={{ backgroundColor: "#37475E", color: "#fff", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <h1 style={{ margin: 0 }}>Update Event</h1>
            </div>
            <div style={{ backgroundColor: "#fff", padding: "20px", marginTop: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <Form name="update-event" onSubmitCapture={handleSubmit} labelAlign="left">
                    <Form.Item label="Event No">
                        <Input value={eventNo} disabled style={{ backgroundColor: "#f0f0f0" }} />
                    </Form.Item>
                    <Form.Item label="Event Name">
                        <Input value={eventName} onChange={(e) => seteventName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Event Location">
                        <Input value={eventPlace} onChange={(e) => seteventPlace(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Event Date">
                        <DatePicker value={eventDate && dayjs(eventDate, 'YYYY-MM-DD')} onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="Event Description">
                        <Input.TextArea value={eventDetails} onChange={(e) => seteventDetails(e.target.value)} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>Submit</Button>
                        <Button htmlType="reset">Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UpdateEvent;