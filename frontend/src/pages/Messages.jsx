import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Messages() {

    const [messages, setMessages] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchMessages();

    }, []);

    const fetchMessages = async () => {

    const teacher = JSON.parse(localStorage.getItem("teacher"));

    if (!teacher) return;

    const res = await API.get(
        `/messages?className=${teacher.assignedClass}`
    );

    setMessages(res.data);

};

    const deleteMessage = async (id) => {

        await API.delete(`/messages/${id}`);

        fetchMessages();

    };

    const copyMessage = (text) => {

        navigator.clipboard.writeText(text);

        alert("Copied!");

    };

    const filteredMessages = messages.filter(message =>
        message.content.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Messages
                </h1>

                <input
                    className="bg-white rounded-2xl p-4 w-full shadow mb-8"
                    placeholder="Search messages..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                <div className="space-y-6">

                    {
                        filteredMessages.map(message => (

                            <div
                                key={message._id}
                                className="bg-white rounded-3xl shadow p-8"
                            >

                                <div className="flex justify-between">

                                    <div>

                                        <h2 className="font-bold text-xl capitalize">
                                            {message.type}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {message.content}
                                        </p>

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => copyMessage(message.content)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-xl"
                                        >
                                            Copy
                                        </button>

                                        <button
                                            onClick={() => deleteMessage(message._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}