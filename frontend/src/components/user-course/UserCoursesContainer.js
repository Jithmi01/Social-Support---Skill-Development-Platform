import React, { useEffect, useState } from "react";
import PageWithTitleSearch from "../common/PageWithTitleSearch";
import courseService from "../../services/courseService";
import UserCourseTable from "./UserCourseTable";

const UserCoursesContainer = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    courseService
      .getAllCourses()
      .then((result) => setCourses(result))
      .catch((err) => console.error(err));
  }, []);
  return (
    <PageWithTitleSearch title={"Courses"}>
      <div style={{ width: "100%", height: "100%", padding: 32 }}>
        <UserCourseTable courses={courses} />
      </div>
    </PageWithTitleSearch>
  );
};

export default UserCoursesContainer;
