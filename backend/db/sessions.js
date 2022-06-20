const { Base, CONNECTION_STRING } = require("./db");

class Sessions extends Base {
  constructor() {
    super(CONNECTION_STRING, "sessions");
    // debounce
    setTimeout(() => {
      this.col
        .createIndex({ emails: 1 }, { expireAfterSeconds: 3600 })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
    }, 10000);
  }

  async add({ email, token }) {
    await this.col.insertOne({ email, token });
  }

  async delete({ email, token }) {
    if (email) {
      await this.col.deleteMany({ email });
      return;
    }

    await this.col.deleteOne({ token });
  }

  async findOne({ email, token }) {
    return this.col.findOne({ email, token });
  }

  async findByToken(token) {
    return this.col.findOne({ token });
  }
}

module.exports = new Sessions();
