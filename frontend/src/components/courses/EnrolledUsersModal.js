import React, { useEffect, useState } from "react";
import { Modal, Table, message, Button } from "antd";
import courseService from "../../services/courseService";

// Modal to display enrolled users for a specific course
const EnrolledUsersModal = ({ open, onClose, courseId }) => {
  // State variables to manage enrolled users, loading state, and course data
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  // Fetch enrolled users and course details when modal opens
  useEffect(() => {
    if (open && courseId) {
      fetchEnrolledUsers();
    }
  }, [open, courseId]);

  // Function to fetch enrolled users and course data
  const fetchEnrolledUsers = async () => {
    setLoading(true);
    try {
      const response = await courseService.getEnrolledUsers(courseId);
      const course = await courseService.getCourseById(courseId);
      setEnrolledUsers(response);
      setCourse(course);
    } catch (error) {
      message.error("Failed to fetch enrolled users!");
    } finally {
      setLoading(false);
    }
  };

  // Function to generate and print a certificate for a user
  const generateCertificate = (user) => {
    // Open a new window for the certificate
    const certificateWindow = window.open('', '_blank', 'width=800,height=600');
    certificateWindow.document.write(`
      <html>
        <head>
          <style>
            /* Certificate page styling */
            body {
              font-family: 'Arial', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
            }
            .certificate-container {
              width: 80%;
              padding: 20px;
              background-color: white;
              border: 5px solid #000;
              text-align: center;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .certificate-header {
              font-size: 26px;
              font-weight: bold;
              margin-bottom: 30px;
            }
            .certificate-body {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .certificate-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .certificate-footer {
              font-size: 16px;
              margin-top: 40px;
              color: #777;
            }
            .certificate-footer i {
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="certificate-header">Certificate of Completion</div>
            <div class="certificate-body">
              <p>This is to certify that</p>
              <div class="certificate-name">${user.name}</div>
              <p>has successfully completed the course</p>
              <div class="certificate-name">${course.name}</div>
            </div>
            <div class="certificate-footer">
              <p>Date: ${new Date().toLocaleDateString()}</p>
              <p><i>Instructor: [Instructor Name]</i></p>
            </div>
          </div>
        </body>
      </html>
    `);

    certificateWindow.document.close(); // Close document writing
    certificateWindow.print(); // Trigger the browser print dialog
  };

  // Define columns for the users table
  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        // Button to print a certificate for each user
        <Button type="primary" onClick={() => generateCertificate(user)}>
          Print Certificate
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Enrolled Users"
      open={open} // Control modal visibility
      onCancel={onClose} // Close modal
      footer={null} // No footer buttons
      width={800} // Modal width
    >
      {/* Display enrolled users in a table */}
      <Table
        columns={columns} // Table columns
        dataSource={enrolledUsers} // Users data
        rowKey="_id" // Unique row key
        loading={loading} // Show loading indicator
      />
    </Modal>
  );
};

export default EnrolledUsersModal;
