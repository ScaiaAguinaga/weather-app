export const populateData = ({
  data,
}: {
  data: (number | null)[];
}): number[] => {
  return data.map((item, i) => {
    if (item === null) {
      // Handle edge cases for the first and last elements
      if (i === 0) {
        return data[i + 1] !== null ? data[i + 1] : 0;
      } else if (i === data.length - 1) {
        return data[i - 1] !== null ? data[i - 1] : 0;
      } else {
        // Replace null with the average of the previous and next items
        const prev = data[i - 1];
        const next = data[i + 1];
        if (prev !== null && next !== null) {
          return (prev + next) / 2;
        } else if (prev !== null) {
          return prev;
        } else if (next !== null) {
          return next;
        }
      }
    }
    return item;
  }) as number[];
};
