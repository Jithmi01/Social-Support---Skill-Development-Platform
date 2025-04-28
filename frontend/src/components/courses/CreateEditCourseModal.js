import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { LoadingOutlined } from "@ant-design/icons";
import courseService from "../../services/courseService";

// Modal component for creating or editing a course
const CreateEditCourseModal = ({ open, onClose, course }) => {
  const [form] = Form.useForm(); // Ant Design form instance
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [courseContent, setCourseContent] = useState(""); // State for course content editor

  // Populate form fields if editing a course
  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
      setCourseContent(course.courseContent || "");
    } else {
      form.resetFields();
      setCourseContent("");
    }
  }, [course, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const courseData = { ...values, courseContent }; // Combine form values with editor content
      if (course) {
        // Update existing course
        await courseService.updateCourse(course._id, courseData);
        message.success("Course updated successfully!");
      } else {
        // Create new course
        await courseService.addCourse(courseData);
        message.success("Course created successfully!");
      }
      onClose(true); // Close modal after successful action
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={course ? "Edit Course" : "Create Course"} // Modal title changes based on edit/create
      open={open} // Modal open/close state
      onCancel={() => onClose(false)} // Handle modal cancel
      footer={null} // No footer buttons
      width={450} // Modal width
      style={{
        borderRadius: "8px", // Rounded corners
      }}
      bodyStyle={{
        padding: "20px",
        background: "#f8f9fb",
        borderRadius: "6px",
      }}
    >
      {/* Form for course creation/edit */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Course Name Field */}
        <Form.Item
          label="Course Name"
          name="name"
          rules={[{ required: true, message: "Please enter course name!" }]}
          style={{ marginBottom: "12px" }}
        >
          <Input
            placeholder="Enter course name"
            style={{
              borderRadius: "5px",
              padding: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          />
        </Form.Item>

        {/* Course Description Field */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
          style={{ marginBottom: "12px" }}
        >
          <Input.TextArea
            placeholder="Enter course description"
            style={{
              borderRadius: "5px",
              padding: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          />
        </Form.Item>

        {/* Enrollment Key Field */}
        <Form.Item
          label="Enrollment Key"
          name="enrollmentKey"
          rules={[{ required: true, message: "Please enter enrollment key!" }]}
          style={{ marginBottom: "12px" }}
        >
          <Input
            placeholder="Enter enrollment key"
            style={{
              borderRadius: "5px",
              padding: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          />
        </Form.Item>

        {/* Course Content Field with TinyMCE Editor */}
        <Form.Item
          label="Course Content"
          name="courseContent"
          rules={[{ required: true, message: "Course content cannot be empty!" }]}
          style={{ marginBottom: "12px" }}
        >
          <Editor
            apiKey="rzq941d2a08ly3uk2ayq0k2fv3zr7karbrki8igno3pbsm2b" // TinyMCE API key
            value={courseContent}
            init={{
              height: 250, // Editor height
              menubar: false, // Hide menu bar
              plugins: ["lists link image", "table paste help wordcount"], // Plugins
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              toolbar_size: "small", // Smaller toolbar
            }}
            onEditorChange={(content) => {
              setCourseContent(content); // Update content state
              form.setFieldsValue({ courseContent: content }); // Update form value
            }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              background: "#007bff",
              color: "white",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              fontSize: "14px",
              height: "40px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px", // Margin on top of button
            }}
          >
            {loading ? <LoadingOutlined /> : course ? "Update Course" : "Create Course"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditCourseModal;
