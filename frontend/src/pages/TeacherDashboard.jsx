import { useEffect, useState } from "react";
import API from "../services/api";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);

  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    if (teacher) {
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      const filtered = res.data.filter(
        (s) =>
          String(s.className).trim().toLowerCase() ===
          String(teacher.assignedClass).trim().toLowerCase()
      );

      setStudents(filtered);
    } catch (error) {
      console.log("Failed to fetch students:", error);
    }
  };

  if (!teacher) {
    return (
      <div className="p-10">
        <h1>Please login as teacher</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome {teacher.name}
      </h1>

      <h2 className="mb-5">
        Class: {teacher.assignedClass}
      </h2>

      {students.length === 0 ? (
        <p>No students found for this class</p>
      ) : (
        students.map((s) => (
          <div key={s._id} className="p-3 border mb-2">
            {s.name} - {s.rollNo}
          </div>
        ))
      )}
    </div>
  );
}