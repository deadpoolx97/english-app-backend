const db = require("../_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllByParams: getAllByParams,
};

async function getAllByParams(params) {
  return await db.Result.findAll(params);
}

async function getAll() {
  return await db.Result.findAll();
}

async function getById(id) {
  return await getResult(id);
}

async function create(params) {
  await db.Result.create(params);
}

async function update(id, params) {
  const result = await getResult(id);

  Object.assign(exam, params);
  await result.save();

  return result.get();
}

async function _delete(id) {
  const result = await getResult(id);
  await result.destroy();
}

// helper functions

async function getResult(id) {
  const result = await db.Result.findByPk(id);
  if (!result) throw "Exam not found";
  return result;
}
