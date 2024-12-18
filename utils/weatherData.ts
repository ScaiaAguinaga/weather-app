export const populateData = ({ data }: { data: (number | null)[] }) => {
  return data.map((item, i, arr) => {
    if (item === null) {
      if (i === 0 || i === data.length - 1) {
        return 1;
      } else {
        const prev = arr[i - 1];
        const next = arr[i + 1];
        if (prev !== null && next !== null) {
          return (prev + next) / 2;
        } else {
          return 1;
        }
      }
    } else {
      return item;
    }
  }) as number[];
};
