import React from "react";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CoursesHeader = ({ onCreateButtonClicked }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        background: "#f0f2f5",  // light gray background for header
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: "8px",  // Rounded corners for header
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // subtle shadow for depth
      }}
    >
      <Title level={5} style={{ margin: 0, fontWeight: "bold" }}>
        Manage Courses
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onCreateButtonClicked}
        style={{
          borderRadius: "8px",  // Rounded button
          padding: "6px 20px",  // Button padding
          transition: "all 0.3s ease",  // Smooth transition on hover
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";  // Slight scaling on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";  // Reset scale
        }}
      >
        Create Course
      </Button>
    </div>
  );
};

export default CoursesHeader;
