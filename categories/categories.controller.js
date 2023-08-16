const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const categoryService = require("./category.service");

// routes
router.post("/", authorize(), createCategorySchema, createCategory);
router.get("/", getAll);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createCategorySchema(req, res, next) {
  const schema = Joi.object({
    categoryName: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function createCategory(req, res, next) {
  categoryService
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
  categoryService
    .getAll()
    .then((categories) =>
      res.json({
        code: 200,
        message: "Successfully",
        data: categories,
      })
    )
    .catch(next);
}

function getById(req, res, next) {
  categoryService
    .getById(req.params.id)
    .then((category) =>
      res.json({
        code: 200,
        message: "Get category Successfully",
        data: category,
      })
    )
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    categoryName: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  categoryService
    .update(req.params.id, req.body)
    .then((category) =>
      res.json({
        code: 200,
        message: "Update successfully",
        data: category,
      })
    )
    .catch(next);
}

function _delete(req, res, next) {
  categoryService
    .delete(req.params.id)
    .then(() =>
      res.json({
        code: 200,
        message: "Deleted successfully",
      })
    )
    .catch(next);
}
