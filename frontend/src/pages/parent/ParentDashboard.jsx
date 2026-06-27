import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ParentDashboard() {

    const [student, setStudent] = useState(null);
    const [messages, setMessages] = useState([]);
    const [attendance, setAttendance] = useState(null);
    const [diaries, setDiaries] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const parent = JSON.parse(localStorage.getItem("parent"));

    // ---------------- LOAD ----------------
    useEffect(() => {
        fetchMyStudent();
        fetchMessages();
    }, []);

    // ---------------- AUTO REFRESH ----------------
    useEffect(() => {

        if (!student) return;

        const interval = setInterval(() => {
            fetchMessages();
            fetchDiary(student.className);
            fetchChat(student._id);
        }, 3000);

        return () => clearInterval(interval);

    }, [student]);

    // ---------------- STUDENT ----------------
    const fetchMyStudent = async () => {

        try {

            const res = await API.get("/students");

            const myStudent = res.data.find(
                s => String(s.parentId?._id || s.parentId) === String(parent._id)
            );

            setStudent(myStudent);

            if (myStudent) {

                // Attendance
                const attendanceRes = await API.get(
                    `/attendance/student/${myStudent._id}`
                );

                setAttendance(attendanceRes.data);

                // Diary
                await fetchDiary(myStudent.className);

                // Chat
                await fetchChat(myStudent._id);

            }

        } catch (error) {
            console.log(error);
        }

    };

    // ---------------- ALERTS ----------------
    const fetchMessages = async () => {

        try {

            const res = await API.get("/messages");

            const filtered = res.data.filter(
                m => String(m.studentId?.parentId?._id) === String(parent._id)
            );

            setMessages(filtered);

        } catch (error) {
            console.log(error);
        }

    };

    // ---------------- DIARY ----------------
    const fetchDiary = async (className) => {

        try {

            const res = await API.get(
                `/diary?className=${className}`
            );

            setDiaries(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    // ---------------- CHAT ----------------
    const fetchChat = async (studentId) => {

        try {

            const res = await API.get(`/chat/${studentId}`);

            setChatMessages(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    // ---------------- SEND MESSAGE ----------------
    const sendMessage = async () => {

        if (!message.trim() || !student) return;

        try {

            await API.post("/chat", {
                studentId: student._id,
                sender: "parent",
                senderId: parent._id,
                message
            });

            setMessage("");

            await fetchChat(student._id);

        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 p-8">

            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-5xl font-extrabold text-slate-800">
                    Parent Dashboard
                </h1>
                <p className="text-slate-600 mt-2 text-lg">
                    Welcome back,{" "}
                    <span className="text-indigo-700 font-bold">
                        {parent?.name}
                    </span> 👋
                </p>
                <div className="flex justify-end mb-6">
 
</div>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* STUDENT CARD */}
                <div className="rounded-3xl p-7 bg-white/70 backdrop-blur-xl border border-white shadow-xl
                    hover:scale-[1.02] transition-all duration-300 hover:shadow-pink-300/30">

                    <h2 className="text-2xl font-bold mb-6 text-indigo-700">
                        👶 Student Profile
                    </h2>

                    {student ? (
                        <div className="space-y-5">

                            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-200 to-indigo-50 shadow">
                                <p className="text-xs text-indigo-700">Name</p>
                                <p className="font-bold text-lg">{student.name}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-200 to-pink-50 shadow">
                                <p className="text-xs text-pink-700">Class</p>
                                <p className="font-semibold">{student.className}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-200 to-yellow-50 shadow">
                                <p className="text-xs text-yellow-700">Roll No</p>
                                <p className="font-semibold">{student.rollNo}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-200 to-green-50 shadow">
                                <p className="text-xs text-green-700">Phone</p>
                                <p className="font-semibold">{student.phoneNumber}</p>
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-500">
                            <div className="text-5xl animate-bounce">😕</div>
                            No student linked yet
                        </div>
                    )}
                </div>
                {/* ATTENDANCE OVERVIEW */}
<div className="rounded-3xl bg-white/80 backdrop-blur shadow-xl border border-white p-7 mt-8">

    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📊 Attendance Overview
    </h2>

    {!attendance ? (

        <div className="text-center py-10 text-slate-500">
            Loading attendance...
        </div>

    ) : (

        <>
            <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-sm text-blue-600">Total Days</p>
                    <p className="text-3xl font-bold">
                        {attendance.total}
                    </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-green-600">Present</p>
                    <p className="text-3xl font-bold text-green-600">
                        {attendance.present}
                    </p>
                </div>

                <div className="rounded-2xl bg-red-50 p-4">
                    <p className="text-sm text-red-600">Absent</p>
                    <p className="text-3xl font-bold text-red-600">
                        {attendance.absent}
                    </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-4">
                    <p className="text-sm text-purple-600">Attendance</p>
                    <p className="text-3xl font-bold text-purple-600">
                        {attendance.percentage}%
                    </p>
                </div>

            </div>

            <div className="mt-6">

                <div className="flex justify-between mb-2">
                    <span className="font-medium">Overall Status</span>

                    <span
                        className={`font-bold ${
                            attendance.status === "Good"
                                ? "text-green-600"
                                : attendance.status === "Warning"
                                ? "text-yellow-600"
                                : "text-red-600"
                        }`}
                    >
                        {attendance.status}
                    </span>
                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-700 ${
                            attendance.status === "Good"
                                ? "bg-green-500"
                                : attendance.status === "Warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{
                            width: `${attendance.percentage}%`
                        }}
                    />
                </div>

            </div>
        </>

    )}

</div>
<div className="rounded-3xl p-7 mt-8 bg-white/80 backdrop-blur-xl border border-white shadow-xl">

    <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        📖 Daily Diary
    </h2>

    {diaries.length === 0 ? (

        <div className="text-center py-12 text-slate-500">
            <div className="text-6xl">📚</div>
            No diary published today
        </div>

    ) : (

        <div className="space-y-6">

            {diaries.map(diary => (

                <div
                    key={diary._id}
                    className="rounded-3xl p-6 bg-gradient-to-br from-indigo-50 via-white to-pink-50 border shadow-lg hover:scale-[1.01] transition-all duration-300"
                >

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">

                        <div>

                            <h3 className="text-xl font-bold text-slate-800">
                                📚 {diary.subject}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {new Date(diary.createdAt).toLocaleDateString()}
                            </p>

                        </div>

                        <span className={`px-4 py-2 rounded-full text-white font-semibold
                        ${
                            diary.priority === "Urgent"
                                ? "bg-red-500"
                                : diary.priority === "Important"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}>

                            {diary.priority}

                        </span>

                    </div>

                    <div className="grid gap-4">

                        <div className="bg-blue-50 rounded-2xl p-4">

                            <h4 className="font-bold text-blue-700 mb-2">
                                📘 Today's Lesson
                            </h4>

                            <p>{diary.lesson}</p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-4">

                            <h4 className="font-bold text-green-700 mb-2">
                                🏠 Homework
                            </h4>

                            <p>{diary.homework || "No homework assigned."}</p>

                        </div>

                        <div className="bg-yellow-50 rounded-2xl p-4">

                            <h4 className="font-bold text-yellow-700 mb-2">
                                📢 Announcement
                            </h4>

                            <p>{diary.announcement || "No announcements."}</p>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>



                {/* ALERTS */}
<div
    className="rounded-3xl p-7 bg-white/70 backdrop-blur-xl border border-white shadow-xl
    hover:shadow-indigo-300/30 transition-all duration-300"
>

    <h2 className="text-2xl font-bold mb-6 text-pink-600">
        🔔 Alerts
    </h2>

    {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
            <div className="text-5xl animate-pulse">📭</div>
            <p className="mt-3">No alerts yet</p>
        </div>
    ) : (
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">

            {messages.map((msg, i) => (

                <div
                    key={msg._id}
                    className="p-5 rounded-2xl border shadow-md bg-white
                    hover:scale-[1.02] transition-all duration-300
                    hover:shadow-pink-200/40"
                >

                    {/* HEADER */}
                    <div className="flex justify-between items-start">

                        <div className="flex items-center gap-2">

                            <span
                                className={`
                                    px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                                    ${
                                        msg.type === "fee"
                                            ? "bg-red-100 text-red-600"
                                            : msg.type === "attendance"
                                            ? "bg-blue-100 text-blue-600"
                                            : msg.type === "behavior"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : msg.type === "progress"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-slate-100 text-slate-700"
                                    }
                                `}
                            >
                                {msg.type}
                            </span>

                            <span className="text-xs text-slate-400 font-medium">
                                #{i + 1}
                            </span>

                        </div>

                        <div className="text-right">

                            <p className="text-xs font-semibold text-slate-500">
                                {new Date(msg.createdAt).toLocaleDateString()}
                            </p>

                            <p className="text-[11px] text-slate-400">
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>

                        </div>

                    </div>

                    {/* Divider */}
                    <hr className="my-3 border-slate-200" />

                    {/* CONTENT */}
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                    </p>

                </div>

            ))}

        </div>
    )}

</div>
{/* ================= CHAT ================= */}

<div className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl overflow-hidden">

    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">

        <h2 className="text-2xl font-bold">
            💬 Chat with Class Teacher
        </h2>

        <p className="text-indigo-100 text-sm mt-1">
            Send questions directly to your child's teacher.
        </p>

    </div>

    {/* Messages */}

    <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-slate-50">

        {chatMessages.length === 0 ? (

            <div className="text-center text-slate-500 mt-20">

                <div className="text-6xl mb-3">💬</div>

                <p>No conversation yet.</p>

            </div>

        ) : (

            chatMessages.map(chat => (

                <div
                    key={chat._id}
                    className={`flex ${
                        chat.sender === "parent"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >

                    <div
                        className={`max-w-md px-5 py-3 rounded-3xl shadow-lg ${
                            chat.sender === "parent"
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                : "bg-white"
                        }`}
                    >

                        <p>{chat.message}</p>

                        <p className="text-xs mt-2 opacity-70">

                            {new Date(chat.createdAt).toLocaleString()}

                        </p>

                    </div>

                </div>

            ))

        )}

    </div>

    {/* Input */}

    <div className="border-t bg-white p-5 flex gap-3">

        <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-2xl border border-slate-300 p-4 outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    sendMessage();
                }
            }}
        />

        <button
            onClick={sendMessage}
            className="px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
        >

            📤 Send

        </button>

    </div>

</div>
                

            </div>
            
        </div>
        
    );
}