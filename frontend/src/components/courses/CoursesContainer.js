import React, { useState } from "react";
import CoursesHeader from "./CoursesHeader";
import CoursesTable from "./CoursesTable";
import CreateEditCourseModal from "./CreateEditCourseModal";

const CoursesContainer = () => {
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onCourseSelected = (course) => {
    setSelectedCourse(course);
    setCreateModalOpened(true);
  };

  const handleModalClose = (refresh) => {
    setCreateModalOpened(false);
    setSelectedCourse(null);
    if (refresh) {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  return (
    <div
      className="otherdash"
      style={{
        maxHeight: "84vh",
        display: "flex",
        flexDirection: "column",
        padding: 32,
      }}
    >
      <CoursesHeader onCreateButtonClicked={() => setCreateModalOpened(true)} />
      <CoursesTable
        onCourseSelected={onCourseSelected}
        refreshTrigger={refreshTrigger}
      />
      <CreateEditCourseModal
        open={createModalOpened}
        onClose={handleModalClose}
        course={selectedCourse}
      />
    </div>
  );
};

export default CoursesContainer;
