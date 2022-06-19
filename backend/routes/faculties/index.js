const Router = require("express").Router;

const Faculties = require("../../db/faculties");

const routes = Router();
const faculties = Router();

routes.post("/register", async (req, res) => {
  let token;
  try {
    token = await Faculties.register(req.body);
  } catch (err) {
    if (err.message === "user-already-exists") {
      // it succeeded, kinda
      res.status(200);
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
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
    token = await Faculties.login(req.body.email, req.body.password);
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
  let faculties;
  try {
    // ideally we should paginate
    if (req.query.search)
      faculties = await Faculties.findByNameCaseIgnored(
        email,
        token,
        req.query.search
      );
    else faculties = await Faculties.getAll(email, token);
  } catch (err) {
    if (err.message === "user-not-logged-in")
      return res.json({
        success: false,
        message: "User is not logged in",
      });
  }

  return res.json({
    success: true,
    faculties,
  });
});

faculties.use("/faculties", routes);

module.exports = faculties;
