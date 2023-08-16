const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const resultService = require("./result.service");
const userService = require("../users/user.service");

// routes
router.post("/", authorize(), createResultSchema, createResult);
router.get("/", authorize(), getAll);
router.get("/getByUser/:id", authorize(), getByUser);
router.get("/rate", authorize(), getRate);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createResultSchema(req, res, next) {
  const schema = Joi.object({
    examId: Joi.number().required(),
    totalPoint: Joi.number().required(),
    userId: Joi.number().required(),
    totalTime: Joi.number().required(),
    answer: Joi.string().required(),
    examName: Joi.string(),
    totalRecords: Joi.number(),
    numberOfCorrect: Joi.number(),
  });
  validateRequest(req, next, schema);
}

async function getRate(req, res, next) {
  const allUser = await userService.getAll();
  resultService
    .getAll()
    .then((results) => {
      res.json({
        code: 200,
        message: "success",
        users: allUser,
        results: results,
      });
    })
    .catch(next);
}

function createResult(req, res, next) {
  resultService
    .create(req.body)
    .then(() =>
      res.json({
        code: 200,
        message: "Created result successfully",
        data: [],
      })
    )
    .catch(next);
}

async function getAll(req, res, next) {
  resultService
    .getAll()
    .then((results) =>
      res.json({
        code: 200,
        message: "Get result successfully",
        data: results,
      })
    )
    .catch(next);
}

function getById(req, res, next) {
  resultService
    .getById(req.params.id)
    .then((results) =>
      res.json({
        code: 200,
        message: "get result successfully",
        data: results,
      })
    )
    .catch(next);
}

async function getByUser(req, res, next) {
  resultService
    .getAllByParams({ where: { userId: req.params.id } })
    .then((exams) =>
      res.json({
        code: 200,
        message: "Get results successfully",
        data: exams,
      })
    )
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    examId: Joi.number().empty(""),
    totalPoint: Joi.number().empty(""),
    userId: Joi.number().empty(""),
    totalTime: Joi.number().empty(""),
    answer: Joi.string().empty(""),
    examName: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  resultService
    .update(req.params.id, req.body)
    .then((exam) =>
      res.json({
        code: 200,
        message: "Update result successfully",
        data: exam,
      })
    )
    .catch(next);
}

function _delete(req, res, next) {
  resultService
    .delete(req.params.id)
    .then(() =>
      res.json({
        code: 200,
        message: "Deleted successfully",
      })
    )
    .catch(next);
}
