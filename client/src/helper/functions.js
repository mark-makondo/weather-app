export const arrayToObjects = (array, type = 'empty') => {
  switch (type) {
    case 'empty':
      // eslint-disable-next-line no-sequences
      return array.reduce((acc, curr) => ((acc[curr] = ''), acc), {});
    default:
      return;
  }
};

export const capitalize = (value) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};
