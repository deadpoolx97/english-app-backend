const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const questionService = require("./question.service");

// routes
router.post("/", authorize(), createQuestionSchema, createQuestion);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createQuestionSchema(req, res, next) {
  const schema = Joi.object({
    questionName: Joi.string().required(),
    questionType: Joi.number().required(),
    questionTitle: Joi.string().required(),
    questionLevel: Joi.number().required(),
    questionCategory: Joi.number(),
    questionAnswer: Joi.string().required(),
    questionPoint: Joi.number().required(),
    questionExam: Joi.number(),
    createdBy: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function createQuestion(req, res, next) {
  questionService
    .create(req.body)
    .then(() =>
      res.json({
        code: 200,
        message: "Created successfully",
        data: [],
      })
    )
    .catch(next);
}

function getAll(req, res, next) {
  questionService
    .getAll()
    .then((questions) =>
      res.json({
        code: 200,
        message: "Successfully",
        data: questions,
      })
    )
    .catch(next);
}

function getById(req, res, next) {
  questionService
    .getById(req.params.id)
    .then((question) =>
      res.json({
        code: 200,
        message: "Successfully",
        data: question,
      })
    )
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    questionName: Joi.string().empty(""),
    questionType: Joi.number().empty(""),
    questionTitle: Joi.string().empty(""),
    questionLevel: Joi.number().empty(""),
    questionCategory: Joi.number().empty(""),
    questionAnswer: Joi.string().empty(""),
    questionPoint: Joi.number().empty(""),
    questionExam: Joi.number().empty(""),
    createdBy: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  questionService
    .update(req.params.id, req.body)
    .then((question) =>
      res.json({
        code: 200,
        message: "Update successfully",
        data: question,
      })
    )
    .catch(next);
}

function _delete(req, res, next) {
  questionService
    .delete(req.params.id)
    .then(() =>
      res.json({
        code: 200,
        message: "Deleted successfully",
      })
    )
    .catch(next);
}
