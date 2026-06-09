const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");


// CREATE EXAM
const createExam = async (req, res) => {

  try {

    const {
      title,
      description,
      duration,
    } = req.body;

    const exam = await Exam.create({
      title,
      description,
      duration,
      createdBy: req.user._id,
    });

    res.status(201).json(exam);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ALL EXAMS
const getExams = async (req, res) => {

  try {

    const exams = await Exam.find();

    res.status(200).json(exams);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const addQuestion = async (req, res) => {

  try {

    const {
      examId,
      questionText,
      options,
      correctAnswer,
      marks,
    } = req.body;

    const question = await Question.create({
      exam: examId,
      questionText,
      options,
      correctAnswer,
      marks,
    });

    res.status(201).json(question);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getQuestionsByExam = async (req, res) => {

  try {

    const questions = await Question.find({
      exam: req.params.examId,
    });

    res.status(200).json(questions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const submitExam = async (req, res) => {

  try {

    const {
      examId,
      answers,
    } = req.body;

    // Get questions
    const questions = await Question.find({
      exam: examId,
    });

    let score = 0;

    // Check answers
    questions.forEach((question) => {

      const studentAnswer = answers.find(
        (a) =>
          a.questionId === question._id.toString()
      );

      if (
        studentAnswer &&
        studentAnswer.selectedAnswer ===
          question.correctAnswer
      ) {
        score += question.marks;
      }

    });

    // Save result
    const result = await Result.create({
      student: req.user._id,
      exam: examId,
      score,
      totalQuestions: questions.length,
      answers,
    });

    res.status(200).json({
      message: "Exam submitted",
      score,
      result,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateExam = async (req, res) => {

  try {

    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    res.status(200).json(exam);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const deleteExam = async (req, res) => {

  try {

    const exam = await Exam.findById(
      req.params.id
    );

    if (!exam) {

      return res.status(404).json({
        message: "Exam not found",
      });

    }

    await Question.deleteMany({
      exam: exam._id,
    });

    await exam.deleteOne();

    res.status(200).json({
      message: "Exam deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createExam,
  getExams,
  addQuestion,
  getQuestionsByExam,
  submitExam,
  updateExam,
  deleteExam,
};