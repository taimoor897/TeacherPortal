import { useEffect, useState } from "react";
import API from "../services/api";

export default function TeacherChat() {

    const teacher = JSON.parse(localStorage.getItem("teacher"));

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {

        if (selectedStudent) {
            fetchMessages();

            const interval = setInterval(fetchMessages, 3000);

            return () => clearInterval(interval);
        }

    }, [selectedStudent]);

    const fetchStudents = async () => {

        try {

            const res = await API.get(
                `/students?className=${teacher.assignedClass}`
            );

            setStudents(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    const fetchMessages = async () => {

        try {

            const res = await API.get(
                `/chat/${selectedStudent._id}`
            );

            setMessages(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    const sendMessage = async () => {

        if (!text.trim()) return;

        try {

            await API.post("/chat", {
                studentId: selectedStudent._id,
                sender: "teacher",
                senderId: teacher._id,
                message: text
            });

            setText("");

            fetchMessages();

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div className="h-screen bg-slate-100 flex">

            {/* LEFT PANEL */}

            <div className="w-80 bg-white shadow-xl">

                <h2 className="text-2xl font-bold p-6">
                    💬 Parents
                </h2>

                {students.map(student => (

                    <div
                        key={student._id}
                        onClick={() => setSelectedStudent(student)}
                        className={`cursor-pointer p-5 border-b hover:bg-slate-100 transition
                        ${
                            selectedStudent?._id === student._id
                                ? "bg-indigo-50"
                                : ""
                        }`}
                    >

                        <h3 className="font-semibold">
                            {student.parentName}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {student.name}
                        </p>

                    </div>

                ))}

            </div>

            {/* RIGHT PANEL */}

            <div className="flex-1 flex flex-col">

                {selectedStudent ? (

                    <>

                        <div className="bg-white shadow p-5">

                            <h2 className="text-2xl font-bold">
                                {selectedStudent.parentName}
                            </h2>

                            <p className="text-gray-500">
                                Student: {selectedStudent.name}
                            </p>

                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">

                            {messages.map(msg => (

                                <div
                                    key={msg._id}
                                    className={`flex
                                    ${
                                        msg.sender === "teacher"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >

                                    <div
                                        className={`max-w-md rounded-3xl px-5 py-3 shadow
                                        ${
                                            msg.sender === "teacher"
                                                ? "bg-indigo-600 text-white"
                                                : "bg-white"
                                        }`}
                                    >

                                        <p>{msg.message}</p>

                                        <p className="text-xs mt-2 opacity-70">
                                            {new Date(msg.createdAt)
                                                .toLocaleTimeString()}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="bg-white p-5 flex gap-4">

                            <input
                                value={text}
                                onChange={(e) =>
                                    setText(e.target.value)
                                }
                                placeholder="Type message..."
                                className="flex-1 border rounded-xl p-3"
                            />

                            <button
                                onClick={sendMessage}
                                className="bg-indigo-600 text-white px-8 rounded-xl"
                            >
                                Send
                            </button>

                        </div>

                    </>

                ) : (

                    <div className="flex flex-1 items-center justify-center text-gray-500 text-xl">
                        Select a parent to start chatting
                    </div>

                )}

            </div>

        </div>

    );

}