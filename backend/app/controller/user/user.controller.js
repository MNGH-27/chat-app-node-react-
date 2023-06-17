function GetUser(req, res) {
  res.send({
    message: "this is test for checking middle ware in user",
  });
}

module.exports = {
  GetUser,
};
