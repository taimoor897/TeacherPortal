import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import AI from "./pages/AI";
import Messages from "./pages/Messages";
import Register from "./pages/Register";
import Alerts from "./pages/Alerts";
import StudentDetail from "./pages/StudentDetail";
import Fees from "./pages/Fees";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentLogin from "./pages/parent/ParentLogin";
import ParentRegister from "./pages/parent/ParentRegister";
import TeacherLogin from "./pages/TeacherLogin";

import TeacherRegister from "./pages/TeacherRegister";
import TeacherMarks from "./pages/TeacherMarks";
import TeacherDiary from "./pages/TeacherDiary";
import TeacherChat from "./pages/TeacherChat";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
path="/students"
element={
  <ProtectedRoute>
    <Students />
  </ProtectedRoute>
}
/>
<Route
path="/attendance"
element={
<ProtectedRoute>
<Attendance />
</ProtectedRoute>
}
/>
<Route
path="/ai"
element={
<ProtectedRoute>
<AI />
</ProtectedRoute>
}
/>
<Route
path="/messages"
element={
<ProtectedRoute>
<Messages />
</ProtectedRoute>
}
/>
<Route
path="/register"
element={<Register />}
/>
<Route path="/alerts" element={<Alerts />} />
<Route path="/students/:id" element={<StudentDetail />} />
<Route path="/fees" element={<Fees />} />
<Route path="/parent/login" element={<ParentLogin />} />
<Route path="/parent/dashboard" element={<ParentDashboard />} />
<Route path="/parent/register" element={<ParentRegister />} />
{/* AUTH */}
        <Route path="/teacher/login" element={<TeacherLogin />} />

        {/* TEACHER DASHBOARD */}
        
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/marks" element={<TeacherMarks />} />
        <Route
    path="/teacher/diary"
    element={<TeacherDiary />}
/>
<Route path="/teacher-chat" element={<TeacherChat />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;