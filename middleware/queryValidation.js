const { throwException } = require("../helpers/utility");

const queryValidation = (req, res, next) => {
    const query = req.query;
    const keyQuery = Object.keys(query);
    const allowQuery = ["page", "city", "company", "rating", "sort", "order"];
    try {
      keyQuery.forEach((e) => {
        if (allowQuery.indexOf(e) === -1) {
          throwException(`${e} query is not allowed`, 400);
        }
      });
      next();
    } catch (error) {
      next(error);
    }
};

module.exports = queryValidation;
