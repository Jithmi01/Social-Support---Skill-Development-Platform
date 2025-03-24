import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { LoadingOutlined } from "@ant-design/icons";
import courseService from "../../services/courseService";

const CreateEditCourseModal = ({ open, onClose, course }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [courseContent, setCourseContent] = useState("");

  useEffect(() => {
    if (course) {
      form.setFieldsValue(course);
      setCourseContent(course.courseContent || "");
    } else {
      form.resetFields();
      setCourseContent("");
    }
  }, [course, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const courseData = { ...values, courseContent };
      if (course) {
        await courseService.updateCourse(course._id, courseData);
        message.success("Course updated successfully!");
      } else {
        await courseService.addCourse(courseData);
        message.success("Course created successfully!");
      }
      onClose(true);
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={course ? "Edit Course" : "Create Course"}
      open={open}
      onCancel={() => onClose(false)}
      footer={null}
      width={450}
      style={{
        borderRadius: "8px",
      }}
      bodyStyle={{
        padding: "20px",
        background: "#f8f9fb",
        borderRadius: "6px",
      }}
    >
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

        {/* Description Field */}
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

        {/* Course Content Editor */}
        <Form.Item
          label="Course Content"
          name="courseContent"
          rules={[{ required: true, message: "Course content cannot be empty!" }]}
          style={{ marginBottom: "12px" }}
        >
          <Editor
            apiKey="rzq941d2a08ly3uk2ayq0k2fv3zr7karbrki8igno3pbsm2b"
            value={courseContent}
            init={{
              height: 250, // Increased height for the content area
              menubar: false,
              plugins: ["lists link image", "table paste help wordcount"],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              toolbar_size: "small", // Reduced toolbar size
            }}
            onEditorChange={(content) => {
              setCourseContent(content);
              form.setFieldsValue({ courseContent: content });
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
              marginTop: "15px", // Added margin to move the button down a bit
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
