export const logout = async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("verified_account");
  return res
    .status(200)
    .json({ message: `User Logged Out Successfully`, success: true });
};
