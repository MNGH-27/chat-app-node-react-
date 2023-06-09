//Packages
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

//use Database Schema
const userSchema = require("./user.schema");
class user {
  //data
  name;
  email;
  password;
  salt;

  //constructor of class
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async createNewUser() {
    //create password for user =>
    const { hash, salt } = setPassword(this.password);

    //request for save the new user
    return await new Promise((res, rej) =>
      userSchema
        .create({
          name: this.name,
          password: this.password,
          email: this.email,
          salt,
          hash,
        })
        .then((response) => {
          //create token for created user
          const token = user.generateJwt(
            response.id,
            response.name,
            response.email,
            response.role
          );

          //return result as response
          res({
            id: response._id,
            name: response.name,
            email: response.email,
            token,
          });
        })
        .catch((err) => {
          //catch error if there would be error
          rej(err);
        })
    );
  }

  //use in passport.js, usercontroller
  static async GetSingleUserByName(name, projection = {}) {
    return await new Promise((res, rej) =>
      userSchema
        .findOne({ name }, projection)
        .then((response) => {
          res(response);
        })
        .catch((err) => {
          rej(err);
        })
    );
  }

  //validate passowrd
  static validPassword(password, salt, userHash) {
    var hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return userHash === hash;
  }

  static generateJwt(id, email, name, role) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign(
      {
        _id: id,
        email: email,
        name: name,
        role: role,
        exp: parseInt(expiry.getTime() / 1000),
      },
      process.env.JWT_SECRET
    ); // DO NOT KEEP YOUR SECRET IN THE CODE!
  }
} //end of user class

//create password in private function
function setPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return {
    salt,
    hash,
  };
}

module.exports = user;
