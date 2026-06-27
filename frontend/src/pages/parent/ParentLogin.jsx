import { useState } from "react";
import API from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function ParentLogin() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const login = async () => {
        try {
            const res = await API.post("/parent/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("parent", JSON.stringify(res.data.parent));

            navigate("/parent/dashboard");

        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100">

            <div className="bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl w-[420px] border border-white">

                {/* TITLE */}
                <h1 className="text-3xl font-bold mb-2 text-center text-slate-800">
                    Parent Login
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Access your child’s updates & alerts
                </p>

                {/* INPUTS */}
                <input
                    name="email"
                    placeholder="Email"
                    className="w-full border p-4 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-4 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    onChange={handleChange}
                />

                {/* LOGIN BUTTON */}
                <button
                    onClick={login}
                    className="w-full bg-slate-900 text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] hover:bg-slate-800 transition-all duration-200 shadow-md"
                >
                    Login
                </button>

                {/* REGISTER LINK */}
                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?
                    <span
                        className="text-blue-600 font-semibold ml-1 cursor-pointer hover:underline"
                        onClick={() => navigate("/parent/register")}
                    >
                        Register
                    </span>
                </p>

                {/* BACK TO MAIN LOGIN (OPTIONAL) */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm px-5 py-2 rounded-xl border bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition"
                    >
                        Back to main login
                    </button>
                </div>

            </div>
        </div>
    );
}