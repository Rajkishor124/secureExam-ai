import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import ExamPage from "../pages/ExamPage";
import AdminDashboard from "../pages/AdminDashboard";
import CreateExam from "../pages/CreateExam";
import AddQuestion from "../pages/AddQuestion";
import ResultsPage from "../pages/admin/ResultsPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam/:examId"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-exam"
          element={
            <ProtectedRoute>
              <CreateExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-question"
          element={
            <ProtectedRoute>
              <AddQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;