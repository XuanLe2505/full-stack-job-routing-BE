const isAuthenticated = (req, res, next) => {
  try {
    const { accesstoken } = req.headers;
    if (!accesstoken || accesstoken !== "123") {
      const error = new Error("Not authenticated");
      error.status = 401;
      throw error;
    }
    next(); //router middleware
  } catch (error) {
    next(error); //escape router middleware acd access into app middleware
  }
};

module.exports = isAuthenticated;
