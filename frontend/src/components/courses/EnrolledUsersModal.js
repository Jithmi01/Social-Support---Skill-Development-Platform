import React, { useEffect, useState } from "react";
import { Modal, Table, message, Button } from "antd";
import courseService from "../../services/courseService";

const EnrolledUsersModal = ({ open, onClose, courseId }) => {
  // State variables to manage enrolled users, loading state, and course data
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  // useEffect hook to fetch enrolled users when the modal is opened and courseId is available
  useEffect(() => {
    if (open && courseId) {
      fetchEnrolledUsers();
    }
  }, [open, courseId]);

  // Function to simulate fetching enrolled users and course data
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

  // Function to generate a certificate for a user
  const generateCertificate = (user) => {
    // Create a new window to display the certificate
    const certificateWindow = window.open('', '_blank', 'width=800,height=600');
    certificateWindow.document.write(`
      <html>
        <head>
          <style>
            /* Styling for certificate layout */
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

    certificateWindow.document.close(); // Close the document to allow rendering
    certificateWindow.print(); // Trigger the print dialog
  };

  // Table columns for displaying enrolled users
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
        // Render a button to print certificate for each user
        <Button type="primary" onClick={() => generateCertificate(user)}>
          Print Certificate
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Enrolled Users"
      open={open} // Modal open state
      onCancel={onClose} // Close modal when triggered
      footer={null} // No footer needed in this modal
      width={800} // Set modal width
    >
      {/* Display the table of enrolled users */}
      <Table
        columns={columns} // Table columns definition
        dataSource={enrolledUsers} // Data source for the table
        rowKey="_id" // Row key for unique identification
        loading={loading} // Show loading spinner while fetching data
      />
    </Modal>
  );
};

export default EnrolledUsersModal;
