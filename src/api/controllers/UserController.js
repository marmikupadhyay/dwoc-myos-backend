const UserController = {
  getUserDetails(req, res, next) {
    res
      .status(200)
      .json({
        message: "User Details Fetched Succesfully",
        data: { username: "xyz" },
      });
  },
};

module.exports = UserController;
