// Create a cache for results that the function produced
// in the past with the given args.
export default () => {
  const results = new Map();

  results.addResults = (args, result) => {
    results.set(args, result);
  };

  results.getResults = args => {
    return results.get(args);
  };

  return results;
};