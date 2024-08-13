export const truncate = (str: string, length: number, ending = "...") => {
  if (str.length > length) {
    return str.slice(0, length - ending.length) + ending;
  }
  return str;
};
