export default (a, b) => {
  return Object.entries(a).reduce((final, [key, value]) => {
    if (!final) return final;
    return b[key] === value;
  }, true);
};