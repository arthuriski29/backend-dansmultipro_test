const jobsRouter = require("express").Router();
const jobsController = require("../controllers/jobs.controller");
// const api = "https://dev6.dansmultipro.com/api/recruitment/positions.json"
// jobsRouter.get(`${api}`, jobsController.getAll);
jobsRouter.get("/", jobsController.getAll);
jobsRouter.get("/:id", jobsController.getOne);

module.exports = jobsRouter;
