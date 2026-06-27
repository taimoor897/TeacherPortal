import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Alerts() {

    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {

        try {
            const res = await API.get("/messages");
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }

    };

    const deleteAlert = async (id) => {

        try {
            await API.delete(`/messages/${id}`);
            fetchMessages();
        } catch (error) {
            console.log(error);
        }

    };

    const markSent = async (id) => {

        try {
            await API.patch(`/messages/sent/${id}`);
            fetchMessages();
        } catch (error) {
            console.log(error);
        }

    };

    const filteredMessages =
        filter === "all"
            ? messages
            : messages.filter(msg => msg.type === filter);

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Alerts Center
                </h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white p-6 rounded-3xl shadow">
                        <h3 className="text-lg font-semibold">Total Alerts</h3>
                        <p className="text-3xl font-bold mt-2">
                            {messages.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow">
                        <h3 className="text-lg font-semibold">Attendance Alerts</h3>
                        <p className="text-3xl font-bold mt-2">
                            {messages.filter(m => m.type === "attendance").length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow">
                        <h3 className="text-lg font-semibold">Unsent Alerts</h3>
                        <p className="text-3xl font-bold mt-2">
                            {messages.filter(m => !m.sent).length}
                        </p>
                    </div>

                </div>

                {/* Filter */}
                <div className="flex gap-4 mb-8">

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border rounded-xl p-3 bg-white"
                    >
                        <option value="all">All Alerts</option>
                        <option value="attendance">Attendance</option>
                        <option value="behavior">Behavior</option>
                        <option value="progress">Progress</option>
                        <option value="fee">Fee</option>
                        <option value="event">Event</option>
                    </select>

                </div>

                {/* Alerts List */}
                <div className="grid gap-5">

                    {filteredMessages.length === 0 ? (

                        <div className="bg-white rounded-3xl p-8 shadow text-center">
                            <h2 className="text-xl font-semibold">
                                No alerts found
                            </h2>
                        </div>

                    ) : (

                        filteredMessages.map((msg) => (

                            <div
                                key={msg._id}
                                className="bg-white rounded-3xl p-6 shadow"
                            >

                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">

                                    <span className="font-bold capitalize text-slate-700">
                                        {msg.type}
                                    </span>

                                    <div className="flex items-center gap-3">

                                        {/* Sent Status Badge */}
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                            msg.sent
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {msg.sent ? "Sent" : "Pending"}
                                        </span>

                                        <span className="text-gray-500">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>

                                    </div>

                                </div>

                                {/* Student */}
                                <h3 className="font-semibold text-lg mb-3">
                                    {msg.studentId?.name || "Unknown Student"}
                                </h3>

                                {/* Content */}
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {msg.content}
                                </p>

                                {/* Actions */}
                                <div className="mt-5 flex gap-3 flex-wrap">

                                    <button
                                        onClick={() => deleteAlert(msg._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => markSent(msg._id)}
                                        className={`px-4 py-2 rounded-xl text-white ${
                                            msg.sent
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700"
                                        }`}
                                        disabled={msg.sent}
                                    >
                                        {msg.sent ? "Already Sent" : "Mark as Sent"}
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}