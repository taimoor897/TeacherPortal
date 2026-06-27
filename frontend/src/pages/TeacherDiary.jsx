import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function TeacherDiary() {

    const teacher = JSON.parse(localStorage.getItem("teacher"));

    const [form, setForm] = useState({
        subject: "English",
        lesson: "",
        homework: "",
        announcement: "",
        priority: "Normal"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const publishDiary = async () => {

        try {

            await API.post("/diary", {
                ...form,
                className: teacher.assignedClass,
                teacherId: teacher._id
            });

            alert("📖 Daily Diary Published");

            setForm({
                subject: "English",
                lesson: "",
                homework: "",
                announcement: "",
                priority: "Normal"
            });

        } catch (err) {
            console.log(err);
            alert("Failed to publish diary");
        }
    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">

            <Sidebar />

            <div className="flex-1 p-10">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-extrabold text-slate-800">
                        📖 Daily Diary
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Create today's classroom diary for <b>{teacher.assignedClass}</b>
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

                    {/* Date */}

                    <div className="mb-6">

                        <label className="font-semibold text-slate-700">
                            Date
                        </label>

                        <div className="mt-2 bg-slate-100 rounded-xl p-4">

                            {new Date().toLocaleDateString()}

                        </div>

                    </div>

                    {/* Subject */}

                    <div className="mb-6">

                        <label className="font-semibold">
                            Subject
                        </label>

                        <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="mt-2 w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option>English</option>
                            <option>Mathematics</option>
                            <option>Urdu</option>
                            <option>Islamiat</option>
                            <option>SST</option>
                            <option>Science</option>
                            <option>Computer</option>
                        </select>

                    </div>

                    {/* Lesson */}

                    <div className="mb-6">

                        <label className="font-semibold">
                            📘 Today's Lesson
                        </label>

                        <textarea
                            rows="4"
                            name="lesson"
                            value={form.lesson}
                            onChange={handleChange}
                            placeholder="What was taught today?"
                            className="mt-2 w-full p-4 rounded-xl border resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                        />

                    </div>

                    {/* Homework */}

                    <div className="mb-6">

                        <label className="font-semibold">
                            🏠 Homework
                        </label>

                        <textarea
                            rows="3"
                            name="homework"
                            value={form.homework}
                            onChange={handleChange}
                            placeholder="Homework details..."
                            className="mt-2 w-full p-4 rounded-xl border resize-none focus:ring-2 focus:ring-green-500 outline-none"
                        />

                    </div>

                    {/* Announcement */}

                    <div className="mb-6">

                        <label className="font-semibold">
                            📢 Announcement
                        </label>

                        <textarea
                            rows="3"
                            name="announcement"
                            value={form.announcement}
                            onChange={handleChange}
                            placeholder="Important information..."
                            className="mt-2 w-full p-4 rounded-xl border resize-none focus:ring-2 focus:ring-pink-500 outline-none"
                        />

                    </div>

                    {/* Priority */}

                    <div className="mb-8">

                        <label className="font-semibold">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="mt-2 w-full p-4 rounded-xl border"
                        >
                            <option>Normal</option>
                            <option>Important</option>
                            <option>Urgent</option>
                        </select>

                    </div>

                    {/* Preview */}

                    <div className="mb-8 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-6 border">

                        <h2 className="text-xl font-bold mb-4">
                            👀 Live Preview
                        </h2>

                        <div className="space-y-3">

                            <p><strong>📚 Subject:</strong> {form.subject}</p>

                            <p><strong>📘 Lesson:</strong> {form.lesson || "-"}</p>

                            <p><strong>🏠 Homework:</strong> {form.homework || "-"}</p>

                            <p><strong>📢 Announcement:</strong> {form.announcement || "-"}</p>

                            <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold
                            ${
                                form.priority === "Urgent"
                                    ? "bg-red-500"
                                    : form.priority === "Important"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}>

                                {form.priority}

                            </span>

                        </div>

                    </div>

                    {/* Publish */}

                    <button
                        onClick={publishDiary}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                    >
                        🚀 Publish Daily Diary
                    </button>

                </div>

            </div>

        </div>

    );

}