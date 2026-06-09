const Result = require("../models/Result");

const getAllResults = async (req, res) => {

  try {

    const results = await Result.find()
      .populate("student", "name email")
      .populate("exam", "title");

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getResultsByExam = async (
  req,
  res
) => {

  try {

    const results = await Result.find({
      exam: req.params.examId,
    })
      .populate("student", "name email")
      .populate("exam", "title");

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAllResults,
  getResultsByExam,
};