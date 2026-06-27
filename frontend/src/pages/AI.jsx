import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function AI() {

    const [studentName, setStudentName] = useState("");
    const [issue, setIssue] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");

    // ---------------- FETCH STUDENTS ----------------
  useEffect(() => {

    const teacher = JSON.parse(localStorage.getItem("teacher"));

    if (!teacher) return;

    API.get(`/students?className=${teacher.assignedClass}`)
        .then(res => setStudents(res.data))
        .catch(err => console.log(err));

}, []);

    // ---------------- GENERATE MESSAGE ----------------
    const generateMessage = async () => {
        if (!selectedStudent && !studentName) {
            alert("Select a student first");
            return;
        }

        setLoading(true);

        try {
            const res = await API.post("/ai/behavior", {
                studentName,
                issue
            });

            setMessage(res.data.message);

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "AI service unavailable"
            );
        }

        setLoading(false);
    };

    // ---------------- TRANSLATE ----------------
    const translateMessage = async () => {
        try {
            const res = await API.post("/ai/translate", {
                text: message
            });

            setMessage(res.data.message);

        } catch (error) {
            console.log(error);
        }
    };

    // ---------------- COPY ----------------
    const copyMessage = () => {
        navigator.clipboard.writeText(message);
        alert("Message copied!");
    };

    // ---------------- SEND TO PARENT ----------------
    const sendToParent = async () => {

        if (!selectedStudent) {
            alert("Please select a student");
            return;
        }

        if (!message) {
            alert("Generate a message first");
            return;
        }

        try {
            await API.post("/ai/send-to-parent", {
                studentId: selectedStudent,
                message,
                type: "behavior"
            });

            alert("Sent to parent!");

        } catch (err) {
            console.log(err);
            alert("Failed to send message");
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    AI Assistant
                </h1>

                <div className="bg-white rounded-3xl shadow p-8">

                    {/* STUDENT SELECT */}
                    <select
                        className="w-full border p-4 rounded-2xl mb-5"
                        value={selectedStudent}
                        onChange={(e) => {
                            setSelectedStudent(e.target.value);

                            const found = students.find(
                                s => s._id === e.target.value
                            );

                            if (found) setStudentName(found.name);
                        }}
                    >
                        <option value="">Select Student</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    {/* ISSUE */}
                    <textarea
                        className="w-full border p-4 rounded-2xl h-40"
                        placeholder="Describe the issue..."
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                    />

                    <div className="flex gap-4 mt-6 flex-wrap">

                        <button
                            onClick={generateMessage}
                            disabled={loading}
                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl"
                        >
                            {loading ? "Generating..." : "Generate Message"}
                        </button>

                        <button
                            onClick={translateMessage}
                            className="bg-blue-500 text-white px-6 py-3 rounded-2xl"
                        >
                            Translate to Urdu
                        </button>

                        <button
                            onClick={copyMessage}
                            className="bg-green-500 text-white px-6 py-3 rounded-2xl"
                        >
                            Copy
                        </button>

                        <button
                            onClick={sendToParent}
                            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl"
                        >
                            Send to Parent
                        </button>

                    </div>
                </div>

                {/* OUTPUT */}
                {message && (
                    <div className="bg-white rounded-3xl shadow p-8 mt-8">
                        <h2 className="text-2xl font-bold mb-5">
                            Generated Message
                        </h2>

                        <div className="whitespace-pre-wrap text-gray-700">
                            {message}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}