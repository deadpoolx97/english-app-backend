const express = require("express");
const router = express.Router();
const Joi = require("joi");
// const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const questionService = require("../questions/question.service");
const resultsService = require("../results/result.service");
const examsService = require("../exams/exam.service");

// routes
router.post("/getGame", authorize(), getGame);
router.post("/finishGame", authorize(), finishGame);

module.exports = router;

async function getGame(req, res, next) {
  let { examId } = req.body;

  let exam = await examsService.getById(examId);

  await questionService
    .getAllByParams({
      where: {
        id: JSON.parse(exam?.listQuestion),
      },
    })
    .then((questions) => {
      res.json({
        code: 200,
        message: "get game successfully",
        examName: exam.examName,
        totalPoint: exam.totalPoint,
        totalTime: exam.totalTime,
        data: questions?.map((quest) => ({
          id: quest.id,
          questionName: quest.questionName,
          questionType: quest.questionType,
          questionTitle: quest.questionTitle,
          questionContent: quest.questionContent,
          questionDescription: quest.questionDescription,
          questionLevel: quest.questionLevel,
          questionCategory: quest.questionCategory,
          questionPoint: quest.questionPoint,
          questionExam: quest.questionExam,
          createdBy: quest.createdBy,
          createdAt: quest.createdAt,
          updatedAt: quest.updatedAt,
        })),
      });
    })
    .catch(next);
}

async function finishGame(req, res, next) {
  const { listAnswer, totalTime, examId, userId } = req.body;
  let scores = 0;
  let numberOfCorrectAnswer = 0;

  const listQuestAnswered = await questionService.getAllByParams({
    where: {
      id: listAnswer?.map((item) => item.id),
    },
  });

  for (let i = 0; i < listAnswer?.length; i++) {
    if (
      listAnswer[i]?.questionAnswer.trim() ===
      listQuestAnswered[i]?.questionAnswer.trim()
    ) {
      scores += listQuestAnswered[i]?.questionPoint;
      numberOfCorrectAnswer++;
    }
  }

  const exam = await examsService.getById(examId);

  let resultBody = {
    userId: userId,
    totalPoint: scores,
    totalTime: totalTime,
    totalRecords: JSON.parse(exam?.listQuestion)?.length || 0,
    numberOfCorrect: numberOfCorrectAnswer,
    examId: examId,
    answer: JSON.stringify(listAnswer),
    examName: exam.examName,
  };
  resultsService
    .create(resultBody)
    .then(() =>
      res.json({
        code: 200,
        message: "finish success",
        totalTime: totalTime,
        examName: exam.examName,
        scores: scores,
      })
    )
    .catch(next);
}

// function getById(req, res, next) {
//   questionService
//     .getById(req.params.id)
//     .then((question) =>
//       res.json({
//         code: 200,
//         message: "Successfully",
//         data: question,
//       })
//     )
//     .catch(next);
// }
