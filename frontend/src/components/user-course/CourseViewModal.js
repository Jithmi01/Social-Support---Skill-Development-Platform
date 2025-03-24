import React from "react";
import { Modal, Typography } from "antd";
import parse from "html-react-parser";
const { Title, Paragraph } = Typography;

const CourseViewModal = ({ course, onClose }) => {
  return (
    <Modal
      width={900}
      title={<h2 style={{ color: "#1890ff", textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>{course.name}</h2>}
      open={true}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)", // Light blue gradient background
        padding: "30px",
        borderRadius: "15px",
        backdropFilter: "blur(15px)", // Glassmorphism effect
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        border: "2px solid #1890ff", // Added border
      }}
      style={{
        borderRadius: "15px",
      }}
    >
      {/* Description Section */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        borderRadius: "10px", 
        background: "#fff", 
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        border: "1px solid #1890ff" // Added border
      }}>
        <Title level={4} style={{ color: "#333", fontWeight: "bold", borderBottom: "2px solid #1890ff", paddingBottom: "5px" }}>Description</Title>
        <Paragraph 
          style={{
            color: "#555",
            fontSize: "16px",
            lineHeight: "1.8",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
          onClick={() => alert('Description clicked!')}
          onMouseEnter={(e) => (e.target.style.color = "#1890ff")}
          onMouseLeave={(e) => (e.target.style.color = "#555")}
        >
          {course.description}
        </Paragraph>
      </div>

      {/* Course Content Section */}
      <div style={{ 
        padding: "15px", 
        borderRadius: "10px", 
        background: "#fff", 
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        border: "1px solid #1890ff" // Added border
      }}>
        <Title level={4} style={{ color: "#333", fontWeight: "bold", borderBottom: "2px solid #1890ff", paddingBottom: "5px" }}>Course Content</Title>
        <div 
          style={{
            background: "linear-gradient(135deg, #f0f8ff, #ffffff)", // Light attractive background
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            border: "1px solid #1890ff" // Added border
          }}
          onClick={() => alert('Course Content clicked!')}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          {parse(course.courseContent.toString())}
        </div>
      </div>
    </Modal>
  );
};

export default CourseViewModal;
