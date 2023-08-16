
const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Category.findAll();
}

async function getById(id) {
    return await getCategory(id);
}

async function create(params) {
    // validate

    // save question
    await db.Category.create(params);
}

async function update(id, params) {
    const category = await getCategory(id);

    // copy params to user and save
    Object.assign(category, params);
    await category.save();

    return category.get();
}

async function _delete(id) {
    const category = await getCategory(id);
    await category.destroy();
}

// helper functions

async function getCategory(id) {
    const category = await db.Category.findByPk(id);
    if (!category) throw 'Category is not exist';
    return category;
}
