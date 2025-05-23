export const COLUMNS = {
  TODO: "todo",
  IN_PROGRESS: "progress",
  DONE: "done",
};

export const isValidDescription = (s) => {
  if (s.length > 500) {
    return false;
  }
  return true;
};

export const isValidLength = (s, length) => {
  if (s.length > length) {
    return false;
  }
  return true;
};
