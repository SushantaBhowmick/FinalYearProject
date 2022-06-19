module.exports = function hashPassword(password) {
  return require("crypto").createHash("md5").update(password).digest("hex");
};
