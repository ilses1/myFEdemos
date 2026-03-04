export const cx = (...xs: Array<string | false | null | undefined>) => {
  return xs.filter((x): x is string => Boolean(x)).join(' ');
};
