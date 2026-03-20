/** English label for daily tap count (1 tap vs N taps). */
export const formatTapLabel = (n: number): string =>
  n === 1 ? '1 tap' : `${n} taps`;
