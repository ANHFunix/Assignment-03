export const toDDMMYYYY = (date) => {
  const tmpDate = new Date(date);

  const dd = tmpDate.getDate() + "";
  const mm = tmpDate.getMonth() + 1 + "";
  const yyyy = tmpDate.getFullYear() + "";

  return [dd.padStart(2, "0"), mm.padStart(2, "0"), yyyy.padStart(4, "0")].join("/");
};
