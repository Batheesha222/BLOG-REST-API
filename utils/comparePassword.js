const bcrypt = require("bcryptjs");
const hashPassword = require("./hashPassword");

const comparePassword = (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}

module.exports = comparePassword;
