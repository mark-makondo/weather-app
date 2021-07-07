export const arrayToObjects = (array, type = 'empty') => {
  switch (type) {
    case 'empty':
      return array.reduce((acc, curr) => ((acc[curr] = ''), acc), {});
    default:
      return;
  }
};

export const capitalize = (value) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};
