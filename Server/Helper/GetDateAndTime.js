export const getDateAndTime = () => {
  const date = new Date();
  return `${date.toDateString()} ${date.toLocaleTimeString()} IST`;
};
