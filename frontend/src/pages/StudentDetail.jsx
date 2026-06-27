import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function StudentDetail() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiSummary, setAiSummary] = useState("");
    const [attendance, setAttendance] = useState(null);

    useEffect(() => {
        fetchStudent();
        fetchMessages();
        fetchAttendance(); // ✅ FIXED: now actually called
    }, []);

    // ---------------- STUDENT ----------------
    const fetchStudent = async () => {
        try {
            const res = await API.get(`/students/${id}`);
            setStudent(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ---------------- ALERTS ----------------
    const fetchMessages = async () => {
        try {
            const res = await API.get("/messages");
            const filtered = res.data.filter(
                m => m.studentId?._id === id
            );
            setMessages(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    // ---------------- ATTENDANCE ----------------
    const fetchAttendance = async () => {
        try {
            const res = await API.get(`/attendance/student/${id}`);
            setAttendance(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ---------------- AI SUMMARY ----------------
    const generateSummary = async () => {

        setLoadingAI(true);

        try {
            const res = await API.post("/ai/behavior", {
                studentName: student.name,
                issue: `
Generate a full student report including:
- attendance observation
- behavior notes from alerts
- overall performance summary

Student: ${student.name}

Messages:
${messages.map(m => m.content).join("\n")}
                `
            });

            setAiSummary(res.data.message);

        } catch (error) {
            console.log(error);
        }

        setLoadingAI(false);
    };

    if (!student) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="p-10">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                {/* ---------------- PROFILE CARD ---------------- */}
                <div className="bg-white p-6 rounded-3xl shadow mb-6">
                    <h1 className="text-3xl font-bold mb-2">
                        {student.name}
                    </h1>

                    <p>Roll No: {student.rollNo}</p>
                    <p>Class: {student.className}</p>
                    <p>Parent: {student.parentName}</p>
                    <p>Phone: {student.phoneNumber}</p>
                    <p>Language: {student.languagePreference}</p>
                </div>

                {/* ---------------- ATTENDANCE ---------------- */}
                <div className="bg-white p-6 rounded-3xl shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        Attendance Overview
                    </h2>

                    {!attendance ? (
                        <p>Loading attendance...</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <p>Total</p>
                                <p className="text-xl font-bold">
                                    {attendance.total}
                                </p>
                            </div>

                            <div>
                                <p>Present</p>
                                <p className="text-xl font-bold text-green-600">
                                    {attendance.present}
                                </p>
                            </div>

                            <div>
                                <p>Absent</p>
                                <p className="text-xl font-bold text-red-600">
                                    {attendance.absent}
                                </p>
                            </div>

                            <div>
                                <p>Percentage</p>
                                <p className="text-xl font-bold">
                                    {attendance.percentage}%
                                </p>
                            </div>

                            <div className="col-span-2">
                                <p>Status</p>
                                <p className={`text-xl font-bold ${
                                    attendance.status === "Good"
                                        ? "text-green-600"
                                        : attendance.status === "Warning"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }`}>
                                    {attendance.status}
                                </p>
                            </div>

                        </div>
                    )}
                </div>

                {/* ---------------- ALERTS ---------------- */}
                <div className="bg-white p-6 rounded-3xl shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        Alerts & Messages
                    </h2>

                    {messages.length === 0 ? (
                        <p>No alerts for this student</p>
                    ) : (
                        messages.map(msg => (
                            <div key={msg._id} className="border-b py-3">
                                <p className="font-semibold capitalize">
                                    {msg.type}
                                </p>
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {msg.content}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* ---------------- AI SUMMARY ---------------- */}
                <div className="bg-white p-6 rounded-3xl shadow">
                    <h2 className="text-xl font-bold mb-4">
                        AI Student Report
                    </h2>

                    <button
                        onClick={generateSummary}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl"
                    >
                        {loadingAI ? "Generating..." : "Generate AI Report"}
                    </button>

                    {aiSummary && (
                        <div className="mt-5 bg-slate-50 p-4 rounded-xl whitespace-pre-wrap">
                            {aiSummary}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}