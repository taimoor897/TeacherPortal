import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Fees() {

    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);

    const [form, setForm] = useState({
        studentId: "",
        totalFee: "",
        paidAmount: "",
        dueDate: "",
        month: "",
        year: new Date().getFullYear(),
        feeType: "Monthly"
    });

    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchFees();
        fetchStudents();
    }, []);

    // ---------------- FETCH FEES ----------------
    const fetchFees = async () => {
    try {

        const teacher = JSON.parse(localStorage.getItem("teacher"));

        if (!teacher) return;

        const res = await API.get(
            `/fees?className=${teacher.assignedClass}`
        );

        setFees(res.data);

    } catch (err) {
        console.log("FETCH FEES ERROR:", err);
    }
};

    // ---------------- FETCH STUDENTS ----------------
    const fetchStudents = async () => {
    try {

        const teacher = JSON.parse(localStorage.getItem("teacher"));

        if (!teacher) return;

        const res = await API.get(
            `/students?className=${teacher.assignedClass}`
        );

        setStudents(res.data);

    } catch (err) {
        console.log("FETCH STUDENTS ERROR:", err);
    }
};

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ---------------- CREATE FEE (FIXED) ----------------
    const createFee = async () => {
        try {

            if (!form.studentId || !form.totalFee || !form.dueDate) {
                alert("Please fill required fields");
                return;
            }

            await API.post("/fees", {
                studentId: form.studentId,
                totalFee: Number(form.totalFee),
                paidAmount: Number(form.paidAmount || 0),
                dueDate: form.dueDate
            });

            fetchFees();

            setForm({
                studentId: "",
                totalFee: "",
                paidAmount: "",
                dueDate: "",
                month: "",
                year: new Date().getFullYear(),
                feeType: "Monthly"
            });

        } catch (err) {
            console.log("CREATE FEE ERROR:", err.response?.data || err.message);
        }
    };

    // ---------------- UPDATE PAYMENT ----------------
    const updatePayment = async (id, amount) => {
        try {
            await API.patch(`/fees/${id}`, {
                paidAmount: Number(amount)
            });

            fetchFees();
        } catch (err) {
            console.log("UPDATE PAYMENT ERROR:", err);
        }
    };
    const deleteFee = async (id) => {
    try {

        await API.delete(`/fees/${id}`);

        fetchFees();

    } catch (err) {
        console.log(err);
    }
};

    const filteredFees =
        filter === "All"
            ? fees
            : fees.filter(f => f.status === filter);

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Fee Management
                </h1>

                {/* FILTER */}
                <div className="mb-6">
                    <select
                        className="border p-3 rounded-xl"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                </div>

                {/* CREATE FEE */}
                <div className="bg-white p-6 rounded-3xl shadow mb-8">

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="studentId"
                            value={form.studentId}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                        >
                            <option value="">Select Student</option>
                            {students.map(s => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        <input
                            name="totalFee"
                            value={form.totalFee}
                            placeholder="Total Fee"
                            className="border p-3 rounded-xl"
                            onChange={handleChange}
                        />

                        <input
                            name="paidAmount"
                            value={form.paidAmount}
                            placeholder="Paid Amount"
                            className="border p-3 rounded-xl"
                            onChange={handleChange}
                        />

                        <input
                            name="dueDate"
                            value={form.dueDate}
                            type="date"
                            className="border p-3 rounded-xl"
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        onClick={createFee}
                        className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-xl"
                    >
                        Create Fee
                    </button>
                </div>

                {/* LIST */}
                <div className="grid gap-4">

                    {filteredFees.map(fee => (
                        <div key={fee._id} className="bg-white p-5 rounded-3xl shadow">

                            <div className="flex justify-between">
                                <p className="font-bold">
                                    {fee.studentId?.name}
                                </p>

                                <span className="text-sm text-gray-500">
                                    {fee.month} {fee.year}
                                </span>
                            </div>

                            <p className="mt-2">
                                Total: {fee.totalFee}
                            </p>

                            <p>Paid: {fee.paidAmount}</p>

                            <p className="font-semibold">
                                Status: {fee.status}
                            </p>

                           <input
    placeholder="Update payment"
    className="border p-2 mt-2 rounded w-full"
    onBlur={(e) =>
        updatePayment(fee._id, e.target.value)
    }
/>

<button
    onClick={() => deleteFee(fee._id)}
    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl"
>
    Delete
</button>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}