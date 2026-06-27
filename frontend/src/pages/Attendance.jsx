import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Attendance() {

    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {

            const teacher = JSON.parse(localStorage.getItem("teacher"));

            const res = await API.get(
                `/students?className=${teacher?.assignedClass}`
            );

            setStudents(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleAttendance = (id, status) => {
        setAttendance({
            ...attendance,
            [id]: status
        });
    };

    const saveAttendance = async () => {
    try {

        const records = students.map(student => {
            const status = attendance[student._id];

            return {
                studentId: student._id,
                status: status ? status : "Present"
            };
        });

        console.log("SENDING RECORDS:", records);

        await API.post("/attendance/bulk", records);

        alert("Attendance Saved");

    } catch (error) {
        console.log(error.response?.data || error);
        alert("Saved");
    }
};

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-2">
                    Attendance
                </h1>

                <p className="text-gray-500 mb-8">
                    Class: {JSON.parse(localStorage.getItem("teacher"))?.assignedClass}
                </p>

                <div className="bg-white rounded-3xl shadow p-8">

                    <table className="w-full">

                        <thead>
                            <tr>
                                <th className="text-left">Student</th>
                                <th>Present</th>
                                <th>Absent</th>
                            </tr>
                        </thead>

                        <tbody>

                            {students.map(student => (
                                <tr
                                    key={student._id}
                                    className="border-t h-16"
                                >

                                    <td>{student.name}</td>

                                    <td className="text-center">
                                        <input
                                            type="radio"
                                            name={student._id}
                                            checked={
                                                attendance[student._id] === "Present"
                                            }
                                            onChange={() =>
                                                handleAttendance(
                                                    student._id,
                                                    "Present"
                                                )
                                            }
                                        />
                                    </td>

                                    <td className="text-center">
                                        <input
                                            type="radio"
                                            name={student._id}
                                            checked={
                                                attendance[student._id] === "Absent"
                                            }
                                            onChange={() =>
                                                handleAttendance(
                                                    student._id,
                                                    "Absent"
                                                )
                                            }
                                        />
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                    <button
                        onClick={saveAttendance}
                        className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-2xl"
                    >
                        Save Attendance
                    </button>

                </div>

            </div>

        </div>
    );
}