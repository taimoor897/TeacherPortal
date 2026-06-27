import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ParentRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const register = async () => {
        try {

            await API.post("/parent/auth/register", form);

            alert("Parent registered successfully");

            navigate("/parent-login");

        } catch (error) {
            console.log(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-3xl shadow w-[450px]">

                <h1 className="text-3xl font-bold mb-6">
                    Parent Register
                </h1>

                <input
                    name="name"
                    placeholder="Full Name"
                    className="border p-3 rounded-xl w-full mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    className="border p-3 rounded-xl w-full mb-3"
                    onChange={handleChange}
                />

                <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="border p-3 rounded-xl w-full mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border p-3 rounded-xl w-full mb-4"
                    onChange={handleChange}
                />

                <button
                    onClick={register}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl"
                >
                    Register
                </button>

            </div>

        </div>
    );
}