const mongoose = require("mongoose");

// Define the course schema
const courseSchema = new mongoose.Schema(
  {
    name: { 
      type: String, // Course name, which is a string
      required: true // Name is required to create a course
    },
    description: { 
      type: String, // A brief description of the course
      required: true // Description is required
    },
    enrollmentKey: { 
      type: String, // A key to enroll in the course
      required: true // Enrollment key is required for enrollment
    },
    enrolledUsers: [{ 
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "user" // This refers to the "user" model, indicating that enrolledUsers is an array of user references
    }],
    courseContent: { 
      type: String, // Content of the course (e.g., syllabus, lessons)
      required: true // Course content is required
    },
  },
  { 
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the course model to be used elsewhere in the application
module.exports = mongoose.model("Course", courseSchema);
