import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Dashboard() {

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalAttendance: 0,
        totalMessages: 0
    });

    const [teacher, setTeacher] = useState(null);

    useEffect(() => {

        const t = JSON.parse(localStorage.getItem("teacher"));
        setTeacher(t);

        if (t) {
            fetchStats(t);
        }

    }, []);

    const fetchStats = async (teacherData) => {
        try {

            const res = await API.get(
                `/dashboard?className=${teacherData?.assignedClass}`
            );

            setStats(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">

        <Sidebar />

        <div className="flex-1 p-4 sm:p-6 lg:p-10">

            {/* HEADER */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Manage your school communication with AI
            </p>

            {/* CLASS BANNER */}
            {teacher && (
                <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Class: {teacher.assignedClass}
                </div>
            )}

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10">

                {/* STUDENTS */}
                <div className="bg-white rounded-2xl shadow p-5 sm:p-6 lg:p-8">
                    <h2 className="text-base sm:text-lg font-semibold">
                        Students
                    </h2>
                    <p className="text-3xl sm:text-4xl lg:text-5xl mt-3 sm:mt-5">
                        {stats.totalStudents}
                    </p>
                </div>

                {/* ATTENDANCE */}
                <div className="bg-white rounded-2xl shadow p-5 sm:p-6 lg:p-8">
                    <h2 className="text-base sm:text-lg font-semibold">
                        Attendance Records
                    </h2>
                    <p className="text-3xl sm:text-4xl lg:text-5xl mt-3 sm:mt-5">
                        {stats.totalAttendance}
                    </p>
                </div>

                {/* MESSAGES */}
                <div className="bg-white rounded-2xl shadow p-5 sm:p-6 lg:p-8">
                    <h2 className="text-base sm:text-lg font-semibold">
                        Messages
                    </h2>
                    <p className="text-3xl sm:text-4xl lg:text-5xl mt-3 sm:mt-5">
                        {stats.totalMessages}
                    </p>
                </div>

            </div>

        </div>
    </div>
);
}
