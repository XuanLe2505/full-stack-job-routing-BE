const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
  sendResponse,
  generateRandomHexString,
  throwException,
} = require("../helpers/utility");
const isAuthenticated = require("../middleware/isAuthenticated")

const loadData = () => {
  let db = fs.readFileSync("data.json", "utf8");
  return JSON.parse(db);
};
const pagination = (page, limit, data) => {
  const offset = (page - 1) * limit;
  const itemsPerPage = data.slice(offset, page * limit);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = parseInt(page);
  return {
    data: itemsPerPage,
    currentPage: currentPage,
    totalPages: totalPages,
    totalItems: totalItems,
  };
};

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}
/* GET companies listing. */
router.get("/", function (req, res, next) {
  const page = req.query.page || 1;
  const limit = 20;
  const { city } = req.query;

  const { jobs, companies } = loadData();

  if (!city) {
    const db = pagination(page, limit, companies);
    const renamedDb = renameKeys(db, { data: "companies" });
    return sendResponse(renamedDb, 200, "Companies list", res, next);
  }
  const citiesList = city.split(",");
  console.log(citiesList)
  let companiesListByCity = companies;

  citiesList.forEach((city) => {
    const jobsListByCity = jobs
      .filter((job) => job.city === city)
      .map((job) => job.companyId);
    companiesListByCity = companiesListByCity.filter((company) =>
      jobsListByCity.includes(company.id)
    );
  });

  const db = pagination(page, limit, companiesListByCity);
  const renamedDb = renameKeys(db, { data: "companies" });
  return sendResponse(renamedDb, 200, `Companies list at the ${city}`, res, next);
});

router.post("/", isAuthenticated, function (req, res, next) {
  try {
    const { name, benefits, description, ratings, jobs } = req.body;
    if (!name || !benefits || !description || !ratings || !jobs) {
      throwException("Missing info", 400);
    }
    let dataToSave = loadData();
    const companyObj = {
      id: generateRandomHexString(10),
      name,
      benefits,
      description,
      ratings,
      jobs,
      numOfJobs: jobs.length,
      numOfRatings: ratings.length,
    };

    dataToSave.companies.push(companyObj);
    dataToSave = JSON.stringify(dataToSave);
    fs.writeFileSync("data.json", dataToSave);
    return sendResponse(companyObj, 200, `create ${name} company success`, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isAuthenticated,function(req, res, next) {
  try {
    const {enterprise} = req.body;
    if (!enterprise) {
      return throwException("Missing info", 400);
    }
    
    const { id } = req.params;
    let dataToUpdate = loadData();
    const { companies } = dataToUpdate;

    const found = companies.find((company) => company.id === id);

    if (!found) {
      return throwException("This company does not exist!", 400);
    }

    const dataCompanyUpdate = companies.map((company) => company.id === id ?
            {...company, enterprise: enterprise} : company);

    dataToUpdate = {...dataToUpdate, companies: dataCompanyUpdate};
    dataToUpdate = JSON.stringify(dataToUpdate);
    fs.writeFileSync("data.json", dataToUpdate);
    return sendResponse(
      dataCompanyUpdate,
      200,
      `Update ${dataCompanyUpdate.name} company success`,
      res,
      next
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, function (req, res, next) {
  try {
    const { id } = req.params;
    let dataToDelete = loadData();
    const { companies } = dataToDelete;

    const found = companies.find((company) => company.id === id);

    if (!found) {
      return throwException("This company does not exist!", 400);
    }

    const companyDeleted = companies.filter((company) => company.id !== id);

    dataToDelete = { ...dataToDelete, companies: companyDeleted };
    dataToDelete = JSON.stringify(dataToDelete);
    fs.writeFileSync("data.json", dataToDelete);
    return sendResponse(
      companyDeleted,
      200,
      `Delete company success`,
      res,
      next
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
