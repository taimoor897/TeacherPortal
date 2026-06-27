import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TeacherRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [assignedClass, setAssignedClass] = useState("Class 1");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await API.post("/teachers", {
        name,
        email,
        password,
        assignedClass,
      });

      localStorage.setItem("teacher", JSON.stringify(res.data));

      alert("Teacher registered successfully");

      navigate("/teacher/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="w-[420px] bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-10 transform transition-all duration-300 hover:scale-[1.01]">

        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-8">
          Teacher Register
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={assignedClass}
            onChange={(e) => setAssignedClass(e.target.value)}
          >
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>

          <button
            onClick={register}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/teacher/login")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}