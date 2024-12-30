export const isAuthenticated = async (req, res) => {
  return res.status(200).json({ success: true });
};
