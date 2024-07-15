export const chunk = <T>(arr: T[], chunk: number): T[][] => {
  return arr.reduce((result, _, idx) => {
    if (idx % chunk === 0) {
      result.push(arr.slice(idx, idx + chunk));
    }

    return result;
  }, Array<T[]>());
};
