function GetUser(req, res) {
  //here we get data from token in cookie
  res.status(200).send({
    ...req.user,
  });
}

module.exports = {
  GetUser,
};
