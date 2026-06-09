const getProfile = async (req, res) => {

  res.status(200).json({
    message: "Protected Profile Route",
    user: req.user,
  });

};


const adminDashboard = async (req, res) => {

  res.status(200).json({
    message: "Welcome Admin",
  });

};

module.exports = {
  getProfile,
  adminDashboard,
};