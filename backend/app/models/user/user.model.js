const userSchema = require("./user.schema");

class user {
  //data
  name;
  email;
  password;

  //constructor of class
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async createNewUser() {}

  static async loginUserHandler() {}
}

module.exports = user;
