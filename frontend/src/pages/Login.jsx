import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">

      {/* background glow blobs */}
      <div className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* CARD */}
      <div className="relative w-[420px] bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10 transform transition-all duration-500 hover:scale-[1.02]">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-center text-slate-800">
          ParentConnect <span className="text-blue-600">AI</span>
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Smart school communication system
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white p-4 rounded-2xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            Login
          </button>
        </form>

        {/* REGISTER */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?
          <Link to="/register" className="text-blue-600 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </p>

        {/* ROLE BUTTONS */}
        <div className="flex gap-3 justify-center mt-6">

          <button
            onClick={() => navigate("/parent/login")}
            className="px-5 py-3 rounded-2xl bg-white border border-blue-200 text-blue-600 font-semibold shadow-sm hover:shadow-md hover:scale-105 transition"
          >
            Parent
          </button>

          <button
            onClick={() => navigate("/teacher/login")}
            className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold shadow-sm hover:shadow-md hover:scale-105 transition"
          >
            Teacher
          </button>

        </div>
      </div>
    </div>
  );
}