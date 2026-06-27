import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/teachers/login", { email });

      if (!res.data) {
        alert("Invalid login");
        return;
      }

      localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:scale-[1.01]">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Teacher Login
        </h1>

        <p className="text-center text-sm text-slate-500 mb-8">
          Access your dashboard securely
        </p>

        {/* INPUT */}
        <input
          className="border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none p-4 w-full rounded-2xl mb-5 transition"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-slate-900 text-white p-4 rounded-2xl font-semibold shadow-md hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <button
          onClick={() => navigate("/teacher/register")}
          className="w-full mt-4 bg-white border border-slate-200 text-slate-700 p-4 rounded-2xl font-medium hover:bg-slate-50 hover:shadow-md transition"
        >
          Register as Teacher
        </button>

      </div>
    </div>
  );
}