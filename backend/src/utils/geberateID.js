const generateTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

export default generateTimestamp;
