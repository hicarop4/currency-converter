export const getFlagClassFromCurrencyCode = (code) => {
  return `fi fi-${code.toLowerCase().slice(0, 2)}`;
};
