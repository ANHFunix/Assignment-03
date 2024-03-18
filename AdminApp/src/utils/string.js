export const toStandard = (str) =>
  str.replace(/  +/g, " ").toLowerCase().trim();

export const compStandard = (str1, str2) =>
  toStandard(str1) === toStandard(str2);

export const toUpperFirstCase = (str) => {
  const stdStr = toStandard(str);
  return stdStr.charAt(0).toUpperCase() + stdStr.slice(1);
};
