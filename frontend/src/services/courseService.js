import axios from "axios";

const BASE_URL = "http://localhost:4000/courses";

const courseService = {
  getAllCourses: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course with ID ${id}:`, error);
      throw error;
    }
  },

  addCourse: async (courseData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, courseData);
      return response.data;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating course with ID ${id}:`, error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course with ID ${id}:`, error);
      throw error;
    }
  },

  enrollUser: async (enrollmentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/enroll`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error("Error enrolling user:", error);
      throw error;
    }
  },

  getEnrolledUsers: async (courseId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${courseId}/enrolled-users`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching enrolled users for course ID ${courseId}:`,
        error
      );
      throw error;
    }
  },
};

export default courseService;
