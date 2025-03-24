const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollUser,
  getEnrolledUsers,
} = require("../controllers/course_controller");

// Route to get all available courses
router.get("/", getAllCourses);

// Route to get a specific course by its ID
router.get("/:id", getCourseById);

// Route to create a new course (Admin access required)
router.post("/create", addCourse);

// Route to update course details (Admin access required)
router.put("/:id", updateCourse);

// Route to delete a course (Admin access required)
router.delete("/:id", deleteCourse);

// Route to enroll a user in a course
router.post("/enroll", enrollUser);

// Route to get all users enrolled in a specific course (Admin access required)
router.get("/:courseId/enrolled-users", getEnrolledUsers);

module.exports = router;
