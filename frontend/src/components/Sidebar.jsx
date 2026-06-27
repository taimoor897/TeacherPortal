import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessageSquare,
  Bot
} from "lucide-react";

export default function Sidebar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        ParentConnect AI
      </h1>

      <div className="space-y-6 flex-1">

        <Link
          to="/dashboard"
          className="flex gap-3 items-center hover:text-blue-400 transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/students"
          className="flex gap-3 items-center hover:text-blue-400 transition"
        >
          <Users size={20} />
          <span>Students</span>
        </Link>

        <Link
          to="/attendance"
          className="flex gap-3 items-center hover:text-blue-400 transition"
        >
          <CalendarDays size={20} />
          <span>Attendance</span>
        </Link>

        <Link
          to="/messages"
          className="flex gap-3 items-center hover:text-blue-400 transition"
        >
          <MessageSquare size={20} />
          <span>Messages</span>
        </Link>

        <Link
          to="/ai"
          className="flex gap-3 items-center hover:text-blue-400 transition"
        >
          <Bot size={20} />
          <span>AI Assistant</span>
        </Link>
        <Link
    to="/alerts"
    className="block px-4 py-3 rounded-xl hover:bg-slate-200"
>
    🚨 Alerts
</Link>
<Link
  to="/fees"
  className="block py-2 px-4 rounded hover:bg-slate-200"
>
  Fees
</Link>
<Link
  to="/marks"
  className="block px-4 py-3 rounded-xl hover:bg-slate-200 transition"
>
  📊 Marks
</Link>
<Link
  to="/teacher/diary"
  className="block px-4 py-3 rounded-xl hover:bg-slate-200 transition"
>
  📖 Daily Diary
</Link>
<Link
    to="/teacher-chat"
    className="block px-4 py-3 rounded-xl hover:bg-slate-200 transition"
>
    💬 Parent Chat
</Link>

      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 transition p-3 rounded-xl w-full"
      >
        Logout
      </button>

    </div>
  );
}