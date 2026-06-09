import { useEffect, useState } from "react";

import { getQuestions, submitExam } from "../services/examService";

import { useParams } from "react-router-dom";

import Timer from "../components/exam/Timer";
import WebcamMonitor from "../components/exam/WebcamMonitor";
import QuestionCard from "../components/exam/QuestionCard";
import ViolationPanel from "../components/exam/ViolationPanel";
import SubmitButton from "../components/exam/SubmitButton";
import ExamHeader from "../components/exam/ExamHeader";

function ExamPage() {

  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState([]);

  const [score, setScore] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(300);

  const [violations, setViolations] = useState(0);


  // ENTER FULLSCREEN
  useEffect(() => {

    const enterFullscreen = async () => {

      try {

        if (document.documentElement.requestFullscreen) {

          await document.documentElement.requestFullscreen();

        }

      } catch (error) {

        console.log(error);

      }
    };

    enterFullscreen();

  }, []);


  // FETCH QUESTIONS
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const data = await getQuestions(examId);

        setQuestions(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchQuestions();

  }, [examId]);


  // TIMER
  useEffect(() => {

    if (submitted) return;

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          handleSubmit();

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [submitted]);


  // AUTO SUBMIT ON VIOLATIONS
  useEffect(() => {

    if (violations >= 3) {

      alert(
        "Too many violations! Exam auto-submitted."
      );

      handleSubmit();
    }

  }, [violations]);


  // FULLSCREEN EXIT DETECTION
  useEffect(() => {

    const handleFullscreenChange = () => {

      if (!document.fullscreenElement) {

        setViolations((prev) => prev + 1);

        alert("Fullscreen exited!");
      }
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };

  }, []);


  // TAB SWITCH DETECTION
  useEffect(() => {

    const handleVisibilityChange = () => {

      if (document.hidden) {

        setViolations((prev) => prev + 1);

        alert("Tab switching detected!");
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };

  }, []);


  // DISABLE RIGHT CLICK
  useEffect(() => {

    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener(
      "contextmenu",
      disableRightClick
    );

    return () => {
      document.removeEventListener(
        "contextmenu",
        disableRightClick
      );
    };

  }, []);


  // DISABLE COPY
  useEffect(() => {

    const disableCopy = (e) => {
      e.preventDefault();
    };

    document.addEventListener("copy", disableCopy);

    return () => {
      document.removeEventListener(
        "copy",
        disableCopy
      );
    };

  }, []);


  // HANDLE OPTION SELECT
  const handleSelect = (
    questionId,
    selectedAnswer
  ) => {

    const updatedAnswers = answers.filter(
      (a) => a.questionId !== questionId
    );

    updatedAnswers.push({
      questionId,
      selectedAnswer,
    });

    setAnswers(updatedAnswers);
  };


  // HANDLE SUBMIT
  async function handleSubmit() {

    if (submitted) return;

    setSubmitted(true);

    try {

      const data = await submitExam({
        examId,
        answers,
      });

      setScore(data.score);

    } catch (error) {

      console.log(error);

    }
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <ExamHeader />

      {
        score !== null && (
          <div className="bg-green-600 p-4 rounded mb-6 text-xl font-bold">
            Your Score: {score}
          </div>
        )
      }

      <Timer timeLeft={timeLeft} />

      <ViolationPanel violations={violations} />

      <WebcamMonitor />

      {
        questions.map((question, index) => (

          <QuestionCard
            key={question._id}
            question={question}
            index={index}
            answers={answers}
            handleSelect={handleSelect}
          />

        ))
      }

      <SubmitButton
        handleSubmit={handleSubmit}
        submitted={submitted}
      />

    </div>
  );
}

export default ExamPage;