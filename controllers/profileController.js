const getProfile = async (req, res) => {
  res.status(200).json({ message: "getting profile" });
};

module.exports = {
  getProfile,
};
