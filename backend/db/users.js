const Sessions = require("./sessions");
const { Base, CONNECTION_STRING } = require("./db");
const hashPassword = require("./lib");
const crypto = require("crypto");

class Users extends Base {
  constructor(type) {
    super(CONNECTION_STRING, type);
  }

  async register(userObject) {
    const user = await this.col.findOne({ email: userObject.email });
    if (user) throw new Error("user-already-exists");
    const hash = hashPassword(userObject.password);
    await this.col.insertOne({ ...userObject, password: hash });
    // register and login at the smae time
    return this.login(userObject.email, hash, true);
  }

  async login(email, password, hashed = false) {
    const hash = hashed ? password : hashPassword(password);
    const user = await this.col.findOne({ email, password: hash });
    if (!user) throw new Error("no-user-found");

    const token = crypto.randomBytes(32).toString("hex");
    await Sessions.add({
      email,
      token,
    });

    return token;
  }

  async logout(email, token) {
    await Sessions.delete({ email, token });
  }

  async findByNameCaseIgnored(email, token, name) {
    if (!(await Sessions.findOne({ email, token })))
      throw new Error("user-not-logged-in");

    return this.col
      .find(
        { fname: new RegExp(name, "i") },
        { projection: { _id: 0, password: 0 }, sort: { name: 1 } }
      )
      .toArray();
  }
  async getAll(email, token) {
    if (!(await Sessions.findOne({ email, token })))
      throw new Error("user-not-logged-in");

    return this.col
      .find({}, { projection: { _id: 0, password: 0 }, sort: { name: 1 } })
      .toArray();
  }
}

module.exports = Users;
