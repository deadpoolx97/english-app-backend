const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllByParams: getAllByParams,
};

async function getAll() {
  return await db.Question.findAll();
}

async function getAllByParams(params) {
  return await db.Question.findAll(params);
}

async function getById(id) {
  return await getQuestion(id);
}

async function create(params) {
  // validate

  // save question
  await db.Question.create(params);
}

async function update(id, params) {
  const question = await getQuestion(id);

  // copy params to user and save
  Object.assign(question, params);
  await question.save();

  return question.get();
}

async function _delete(id) {
  const question = await getQuestion(id);
  await question.destroy();
}

// helper functions

async function getQuestion(id) {
  const question = await db.Question.findByPk(id);
  if (!question) throw "Question not found";
  return question;
}
