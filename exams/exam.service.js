
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getAllByParams: getAllByParams
};

async function getAllByParams(params) {
    return await db.Exam?.findAll(params)
}

async function getAll() {
    return await db.Exam?.findAll();
}

async function getById(id) {
    return await getExam(id);
}

async function create(params) {
    await db.Exam.create(params);
}

async function update(id, params) {
    const exam = await getExam(id);

    Object.assign(exam, params);
    await exam.save();

    return exam.get();
}

async function _delete(id) {
    const exam = await getExam(id);
    await exam.destroy();
}

// helper functions

async function getExam(id) {
    const exam = await db.Exam.findByPk(id);
    if (!exam) throw 'Exam not found';
    return exam;
}
