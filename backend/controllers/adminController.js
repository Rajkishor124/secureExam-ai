const User = require("../models/User");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");

const getAdminStats = async (
  req,
  res
) => {

  try {

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalExams =
      await Exam.countDocuments();

    const totalQuestions =
      await Question.countDocuments();

    const totalAttempts =
      await Result.countDocuments();

    res.status(200).json({
      totalStudents,
      totalExams,
      totalQuestions,
      totalAttempts,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAdminStats,
};