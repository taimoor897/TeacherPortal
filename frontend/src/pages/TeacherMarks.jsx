import { useState, useEffect } from "react";
import API from "../services/api";

export default function TeacherMarks() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [savedMarksId, setSavedMarksId] = useState("");
    const [examType, setExamType] = useState("Mid Term");
const [teacherRemarks, setTeacherRemarks] = useState("");

    const teacher = JSON.parse(localStorage.getItem("teacher"));

    const [subjects, setSubjects] = useState({
        english: 0,
        math: 0,
        urdu: 0,
        islamiat: 0,
        sst: 0,
        science: 0,
        computer: 0
    });

    const [percentage, setPercentage] = useState(0);

    // ✅ ONLY CLASS STUDENTS
    useEffect(() => {
        if (!teacher) return;

        API.get(`/students?className=${teacher.assignedClass}`)
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));

    }, []);

    // percentage calc
    useEffect(() => {
        const total =
            Object.values(subjects).reduce((a, b) => a + Number(b || 0), 0);

        setPercentage((total / 700) * 100);
    }, [subjects]);

    const handleChange = (e) => {
        setSubjects({
            ...subjects,
            [e.target.name]: Number(e.target.value)
        });
    };

   const saveMarks = async () => {
    try {

        const res = await API.post("/marks", {
            studentId: selectedStudent,
            subjects,
            examType,
            teacherRemarks
        });

        setSavedMarksId(res.data._id);

        alert("Marks saved successfully");

    } catch (err) {
        console.log(err);
        alert("Failed to save marks");
    }
};

    const sendToParent = async () => {
    try {
        await API.post(`/marks/${savedMarksId}/send`);
        alert("Sent to parent");
    } catch (err) {
        console.log(err);
        alert("Failed to send");
    }
};

const totalMarks = Object.values(subjects).reduce(
    (sum, mark) => sum + Number(mark || 0),
    0
);

    return (
        <div className="p-10 bg-slate-100 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">
                Marks Entry
            </h1>

            {/* STUDENT SELECT */}
            <select
                className="border p-3 mb-4 w-full rounded-xl"
                onChange={(e) => setSelectedStudent(e.target.value)}
            >
                <option value="">Select Student</option>
                {students.map(s => (
                    <option key={s._id} value={s._id}>
                        {s.name}
                    </option>
                ))}
            </select>

            {/* MARK INPUTS */}
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-3xl shadow">

                {Object.keys(subjects).map(sub => (
                    <input
                        key={sub}
                        name={sub}
                        placeholder={sub.toUpperCase()}
                        className="border p-3 rounded-xl"
                        type="number"
                        onChange={handleChange}
                    />
                ))}

                <textarea
    rows="4"
    placeholder="Enter teacher remarks..."
    value={teacherRemarks}
    onChange={(e) => setTeacherRemarks(e.target.value)}
    className="w-full mt-6 p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
/>

                

            </div>
            <select
    value={examType}
    onChange={(e) => setExamType(e.target.value)}
    className="w-full mt-6 p-3 rounded-xl border"
>
    <option>Mid Term</option>
    <option>Final Term</option>
    <option>Monthly Test</option>
    <option>Quiz</option>
</select>
            

         <div className="mt-6 grid grid-cols-3 gap-4">

    <div className="bg-white rounded-2xl shadow p-5 text-center">
        <p className="text-gray-500">Obtained</p>
        <h2 className="text-3xl font-bold">
            {totalMarks}
        </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-5 text-center">
        <p className="text-gray-500">Total</p>
        <h2 className="text-3xl font-bold">
            700
        </h2>
    </div>

    <div className="bg-white rounded-2xl shadow p-5 text-center">
        <p className="text-gray-500">Percentage</p>
        <h2 className="text-3xl font-bold text-indigo-600">
            {percentage.toFixed(2)}%
        </h2>
    </div>

</div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">

                <button
                    onClick={saveMarks}
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    Save Marks
                </button>

                {savedMarksId && (
    <button
        onClick={sendToParent}
        className="bg-green-600 text-white px-6 py-3 rounded-xl"
    >
        Send to Parent
    </button>
)}

            </div>
        </div>
    );
}