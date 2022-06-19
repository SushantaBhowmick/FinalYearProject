const Users = require("./users");

class Students extends Users {
  constructor() {
    super("students");
  }
}

module.exports = new Students();
