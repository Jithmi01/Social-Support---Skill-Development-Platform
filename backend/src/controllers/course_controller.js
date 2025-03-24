const Course = require("../models/course_model");

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find({});
    res.status(200).json(courses); // Send the courses as a response with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors with a 500 status
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  const { id } = req.params; // Extract course ID from URL parameters

  try {
    // Find the course by its ID
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" }); // If the course doesn't exist, return a 404 status
    res.status(200).json(course); // Send the course data as a response with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors with a 500 status
  }
};

// Create a new course (Admin only)
const addCourse = async (req, res) => {
  const { name, description, enrollmentKey, courseContent } = req.body; // Extract course details from the request body

  try {
    // Create a new course document in the database
    const course = await Course.create({
      name,
      description,
      enrollmentKey,
      courseContent,
    });
    res.status(201).json(course); // Send the newly created course as a response with a 201 status
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors with a 400 status
  }
};

// Update course details (Admin only)
const updateCourse = async (req, res) => {
  const { id } = req.params; // Extract course ID from URL parameters

  try {
    // Update the course details in the database
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(course); // Send the updated course data as a response with a 200 status
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors with a 400 status
  }
};

// Delete a course (Admin only)
const deleteCourse = async (req, res) => {
  const { id } = req.params; // Extract course ID from URL parameters

  try {
    // Delete the course by its ID from the database
    const course = await Course.findByIdAndDelete(id);
    res.status(200).json(course); // Send the deleted course data as a response with a 200 status
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors with a 400 status
  }
};

// Enroll a user in a course
const enrollUser = async (req, res) => {
  const { courseId, enrollementKey, userId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.enrollmentKey !== enrollementKey) {
      return res.status(401).json({ error: "Incorrect enrollment key" });
    }

    if (!course.enrolledUsers.includes(userId)) {
      course.enrolledUsers.push(userId);
      await course.save();
    }

    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a list of enrolled users for a specific course (Admin only)
const getEnrolledUsers = async (req, res) => {
  const { courseId } = req.params; // Extract course ID from URL parameters

  try {
    // Find the course by its ID and populate the enrolledUsers field with their name and email
    const course = await Course.findById(courseId).populate("enrolledUsers", "name email");
    if (!course) return res.status(404).json({ error: "Course not found" }); // If the course doesn't exist, return a 404 status

    res.status(200).json(course.enrolledUsers); // Send the list of enrolled users as a response with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors with a 500 status
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollUser,
  getEnrolledUsers,
};
