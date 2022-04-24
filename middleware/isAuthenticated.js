const {throwException} = require("../helpers"); 

const isAuthenticated = (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    if (!accesstoken || accesstoken !== "123") {
      throwException("Not authenticated", 401);
    }
    next(); //router middleware
  } catch (error) {
    next(error); //escape router middleware acd access into app middleware
  }
};

module.exports = isAuthenticated;
