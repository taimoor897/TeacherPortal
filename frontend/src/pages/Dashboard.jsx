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

       <div className="dashboard-container flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                {/* HEADER */}
                <h1 className="text-4xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your school communication with AI
                </p>

                {/* CLASS BANNER (RESTORED) */}
                {teacher && (
                    <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                        Class: {teacher.assignedClass}
                    </div>
                )}

                {/* STATS */}
                <div className="grid grid-cols-3 gap-8 mt-10">

                    <div className="bg-white rounded-3xl shadow p-8">
                        <h2 className="text-xl font-semibold">
                            Students
                        </h2>
                        <p className="text-5xl mt-5">
                            {stats.totalStudents}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow p-8">
                        <h2 className="text-xl font-semibold">
                            Attendance Records
                        </h2>
                        <p className="text-5xl mt-5">
                            {stats.totalAttendance}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow p-8">
                        <h2 className="text-xl font-semibold">
                            Messages
                        </h2>
                        <p className="text-5xl mt-5">
                            {stats.totalMessages}
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );
}
