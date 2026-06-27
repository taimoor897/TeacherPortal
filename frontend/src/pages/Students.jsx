import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Students() {

  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  const teacher = JSON.parse(localStorage.getItem("teacher"));

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    parentId: "",
    phoneNumber: "",
    languagePreference: "english"
  });

  useEffect(() => {
    fetchStudents();
    fetchParents();
  }, []);

  // ---------------- STUDENTS ----------------
  const fetchStudents = async () => {
    try {

      const res = await API.get(
        `/students?className=${teacher.assignedClass}`
      );

      setStudents(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- PARENTS ----------------
  const fetchParents = async () => {
    try {

      const res = await API.get("/parents");

      setParents(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- ADD STUDENT ----------------
  const addStudent = async () => {

    try {

      await API.post("/students", {
        ...form,
        className: teacher.assignedClass
      });

      fetchStudents();

      setForm({
        name: "",
        rollNo: "",
        parentId: "",
        phoneNumber: "",
        languagePreference: "english"
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {

    try {

      await API.delete(`/students/${id}`);

      fetchStudents();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="students-page flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Students
        </h1>

        {/* ADD FORM */}
        <div className="bg-white p-8 rounded-3xl shadow mb-10">

          <div className="grid grid-cols-2 gap-4">

            <input
              name="name"
              placeholder="Student Name"
              className="border p-4 rounded-xl"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="rollNo"
              placeholder="Roll Number"
              className="border p-4 rounded-xl"
              value={form.rollNo}
              onChange={handleChange}
            />

            {/* Teacher's assigned class */}
            <input
              value={teacher.assignedClass}
              disabled
              className="border p-4 rounded-xl bg-gray-100"
            />

            {/* Parent Dropdown */}
            <select
              name="parentId"
              className="border p-4 rounded-xl"
              value={form.parentId}
              onChange={handleChange}
            >
              <option value="">Select Parent</option>

              {parents.map(parent => (
                <option
                  key={parent._id}
                  value={parent._id}
                >
                  {parent.name} ({parent.email})
                </option>
              ))}

            </select>

            <input
              name="phoneNumber"
              placeholder="Phone Number"
              className="border p-4 rounded-xl"
              value={form.phoneNumber}
              onChange={handleChange}
            />

            <select
              name="languagePreference"
              className="border p-4 rounded-xl"
              value={form.languagePreference}
              onChange={handleChange}
            >
              <option value="english">English</option>
              <option value="urdu">Urdu</option>
            </select>

          </div>

          <button
            onClick={addStudent}
            className="mt-6 bg-slate-900 text-white px-8 py-4 rounded-2xl"
          >
            Add Student
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow p-8">

          <table className="w-full">

            <thead>

              <tr className="text-left">
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Phone</th>
                <th>Language</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {students.map(student => (

                <tr
                  key={student._id}
                  className="border-t h-16"
                >

                  <td
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/students/${student._id}`)}
                  >
                    {student.name}
                  </td>

                  <td>{student.rollNo}</td>
                  <td>{student.className}</td>
                  <td>{student.parentId?.name}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.languagePreference}</td>

                  <td>

                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}
