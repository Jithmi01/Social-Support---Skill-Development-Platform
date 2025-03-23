import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button, Descriptions, Space } from "antd";

const DetailsPrint = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Event Details",
    });

    const [eventNo, seteventNo] = useState("");
    const [eventName, seteventName] = useState("");
    const [eventPlace, seteventPlace] = useState("");
    const [eventDetails, seteventDetails] = useState("");
    const [eventDate, seteventDate] = useState("");

    const { id } = useParams();

    useEffect(() => {
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
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            <div style={{ backgroundColor: "#37475E", color: "#fff", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <h1 style={{ margin: 0 }}>Event Details</h1>
            </div>
            <div style={{ backgroundColor: "#fff", padding: "20px", marginTop: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <div ref={componentRef} style={{ padding: "20px" }}>
                    
                    {/* Company Header Section */}
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <h2 style={{ margin: "0", color: "#333" }}>EmpowerHub-Skill Development & Learning Platform</h2>
                        <p style={{ margin: "5px 0" }}>No 155 , Malabe , Colombo</p>
                        <p style={{ margin: "5px 0" }}>Phone: +123 456 7890 | Email: info@yEmpowerHub-Skill.com</p>
                        <hr style={{ borderTop: "2px solid #000", marginTop: "10px" }} />
                    </div>

                    {/* Event Information */}
                    <Descriptions title="Event Information" layout="vertical" bordered style={{ borderRadius: "10px", padding: "15px" }}>
                        <Descriptions.Item label="Event Number">{eventNo}</Descriptions.Item>
                        <Descriptions.Item label="Event Date" span={2}>{eventDate}</Descriptions.Item>
                        <Descriptions.Item label="Event Name" span={3}>{eventName}</Descriptions.Item>
                        <Descriptions.Item label="Event Location" span={3}>{eventPlace}</Descriptions.Item>
                        <Descriptions.Item label="Event Description" span={3}>{eventDetails}</Descriptions.Item>
                    </Descriptions>
                </div>

                {/* Buttons */}
                <Space direction="horizontal" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button type="primary" onClick={handlePrint} style={{ marginRight: "10px" }}>Download PDF</Button>
                    <Link to="/dashboard">
                        <Button type="primary" danger>Cancel</Button>
                    </Link>
                </Space>
            </div>
        </div>
    );
}

export default DetailsPrint;