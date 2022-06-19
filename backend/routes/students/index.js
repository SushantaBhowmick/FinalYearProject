const Router = require("express").Router;

const Students = require("../../db/students");

const routes = Router();
const students = Router();

routes.post("/register", async (req, res) => {
  let token;
  try {
    token = await Students.register(req.body);
  } catch (err) {
    if (err.message === "user-already-exists") {
      // it succeeded, kinda
      res.status(200);
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    console.error(err);
    res.status(400);
    return res.json({
      success: false,
      message: err.message,
    });
  }
  res.status(200);
  return res.json({
    success: true,
    token,
  });
});

routes.post("/login", async (req, res) => {
  let token;
  try {
    token = await Students.login(req.body.email, req.body.password);
  } catch (err) {
    if (err.message === "no-user-found")
      return res.json({
        success: false,
        message: "No user found",
      });
  }
  res.status(200);
  return res.json({
    success: true,
    token,
  });
});

routes.get("/list", async (req, res) => {
  const { email, token } = req.headers || {};
  let students;
  try {
    // ideally we should paginate
    if (req.query.search)
      students = await Students.findByNameCaseIgnored(
        email,
        token,
        req.query.search
      );
    else students = await Students.getAll(email, token);
  } catch (err) {
    if (err.message === "user-not-logged-in")
      return res.json({
        success: false,
        message: "User is not logged in",
      });
  }

  return res.json({
    success: true,
    students,
  });
});

students.use("/students", routes);

module.exports = students;
