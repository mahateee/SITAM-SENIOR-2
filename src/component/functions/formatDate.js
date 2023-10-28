const formatDate = (date) => {
  const timestamp =
    date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000);
  const formattedDate = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return formattedDate.toLocaleDateString("en-US", options);
};
export { formatDate };
