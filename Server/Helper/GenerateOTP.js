export const generateOTP = () => {
  const chars = "ABCDEF12345GHIJKL678MNOPQRSTUVWXYZ90";

  let otp = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    otp += chars[randomIndex];
  }
  console.log(otp);
  return otp;
};
