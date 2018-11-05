// Create global store for mapping functions to their memorizers.
export default () => {
  const functions = new Map();

  functions.addMemorizer = (fn, memorizer) => {
    functions.set(fn, memorizer);
  };

  functions.getMemorizer = fn => {
    return functions.get(fn);
  };

  return functions;
};