const Users = require("./users");

class Faculties extends Users {
  constructor() {
    super("faculties");
  }
}

module.exports = new Faculties();
