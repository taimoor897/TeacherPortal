const Attendance = require('../models/Attendance');

const Student = require('../models/Student');
const Message = require('../models/Message');

// Mark single attendance
const markAttendance = async (req, res) => {

    try {

        const student = await Student.findById(req.body.studentId);

        const attendance = await Attendance.create({
            ...req.body,
            status: req.body.status?.trim(),   // 🔥 FIX
            className: student?.className
        });

        // Normalize status check
        if ((attendance.status || "").toLowerCase() === "absent") {

            const student = await Student.findById(attendance.studentId);

            if (student) {

                let content = "";

                if (student.languagePreference === "urdu") {
                    content = `
محترم والدین،

یہ اطلاع دی جاتی ہے کہ ${student.name} آج اسکول سے غیر حاضر رہے۔

اگر یہ غیر حاضری غیر متوقع ہے تو براہِ کرم اسکول انتظامیہ سے رابطہ کریں۔

شکریہ
`;
                } else {
                    content = `
Dear Parent,

This is to inform you that ${student.name} was marked absent today.

If this absence was unexpected, please contact the school administration.

Regards,
School Administration
`;
                }

                await Message.create({
                    studentId: student._id,
                    type: "attendance",
                    language: student.languagePreference,
                    content
                });
            }
        }

        res.status(201).json(attendance);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mark attendance for entire class
const bulkAttendance = async (req, res) => {

    try {

        const attendanceData = req.body;

        const enrichedData = await Promise.all(
            attendanceData.map(async (item) => {

                const student = await Student.findById(item.studentId);

                return {
                    studentId: item.studentId,
                    status: (item.status || "Present").trim(),
                    className: student?.className
                };
            })
        );

        const records = await Attendance.insertMany(enrichedData);

        for (const record of records) {

            if ((record.status || "").toLowerCase() === "absent") {

                const student = await Student.findById(record.studentId);

                if (student) {

                    let content = "";

                    if (student.languagePreference === "urdu") {
                        content = `
محترم والدین،

یہ اطلاع دی جاتی ہے کہ ${student.name} آج اسکول سے غیر حاضر رہے۔

اگر یہ غیر حاضری غیر متوقع ہے تو براہِ کرم اسکول انتظامیہ سے رابطہ کریں۔

شکریہ
`;
                    } else {
                        content = `
Dear Parent,

This is to inform you that ${student.name} was marked absent today.

If this absence was unexpected, please contact the school administration.

Regards,
School Administration
`;
                    }

                    await Message.create({
                        studentId: student._id,
                        type: "attendance",
                        language: student.languagePreference,
                        content
                    });
                }
            }
        }

        res.status(201).json(records);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get attendance by date
const getAttendanceByDate = async (req, res) => {

    try {

        const selectedDate = new Date(req.params.date);

        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const records = await Attendance.find({
            date: {
                $gte: selectedDate,
                $lt: nextDay
            }
        }).populate('studentId');

        res.json(records);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getStudentAttendance = async (req, res) => {

    try {

        const records = await Attendance.find({
            studentId: req.params.id
        });

        const total = records.length;
        const present = records.filter(r => r.status === "Present").length;
        const absent = records.filter(r => r.status === "Absent").length;

        const percentage = total === 0
            ? 0
            : Math.round((present / total) * 100);

        let status = "Good";

        if (percentage < 70) status = "Critical";
        else if (percentage < 85) status = "Warning";

        res.json({
            total,
            present,
            absent,
            percentage,
            status
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    markAttendance,
    bulkAttendance,

    getAttendanceByDate,
    getStudentAttendance
};


