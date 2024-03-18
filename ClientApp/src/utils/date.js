export const toDDMMYYYY = (date) => {
  const tmpDate = new Date(date);

  const dd = tmpDate.getDate() + "";
  const mm = tmpDate.getMonth() + 1 + "";
  const yyyy = tmpDate.getFullYear() + "";

  console.log(date.toString());
  console.log(tmpDate.toString());

  return [dd.padStart(2, "0"), mm.padStart(2, "0"), yyyy.padStart(4, "0")].join(
    "/"
  );
};

// export const toDDMMYYYY = (date) => {
//   const dd = date.slice(8, 10);
//   const mm = date.slice(5, 7);
//   const yyyy = date.slice(0, 4);

//   return [dd, mm, yyyy].join("/");
// };
