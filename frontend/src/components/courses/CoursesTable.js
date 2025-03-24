import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Input, Tooltip, Space } from "antd";
import { EditOutlined, DeleteOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import courseService from "../../services/courseService";
import EnrolledUsersModal from "./EnrolledUsersModal";

const CoursesTable = ({ onCourseSelected, refreshTrigger }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [refreshTrigger]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseService.getAllCourses();
      setCourses(response);
      setFilteredCourses(response);
    } catch (error) {
      message.error("Failed to fetch courses!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await courseService.deleteCourse(id);
      message.success("Course deleted successfully!");
      fetchCourses();
    } catch (error) {
      message.error("Failed to delete course!");
    }
  };

  const handleViewEnrolledUsers = (courseId) => {
    setSelectedCourseId(courseId);
    setModalOpen(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit Course">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onCourseSelected(record)}
              style={{
                borderRadius: "6px",
                transition: "all 0.3s",
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Course">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                style={{
                  borderRadius: "6px",
                  transition: "all 0.3s",
                  padding: "5px 10px",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </Tooltip>
          </Popconfirm>

          <Tooltip title="View Enrolled Users">
            <Button
              type="default"
              icon={<UserOutlined />}
              onClick={() => handleViewEnrolledUsers(record._id)}
              style={{
                borderRadius: "6px",
                transition: "all 0.3s",
                padding: "5px 10px",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Topic/Title Section */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1890ff",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Course Management
      </div>

      {/* Search Input */}
      <Input
        placeholder="Search courses..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: 16,
          width: "100%",
          padding: "10px 15px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          border: "1px solid #dcdcdc",
        }}
        prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
        allowClear
      />

      {/* Courses Table */}
      <Table
        columns={columns}
        dataSource={filteredCourses}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          position: ["bottomCenter"],
        }}
        rowClassName="table-row"
        bordered
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Modal for Enrolled Users */}
      <EnrolledUsersModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        courseId={selectedCourseId}
      />
    </>
  );
};

export default CoursesTable;
