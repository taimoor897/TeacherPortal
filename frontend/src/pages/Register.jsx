import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-[420px] p-10 rounded-3xl shadow">

        <h1 className="text-3xl font-bold mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-4 rounded-xl mb-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl mb-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-6"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full bg-slate-900 text-white p-4 rounded-xl"
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}