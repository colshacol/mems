const shallowEquals = (a, b) => {
  return Object.entries(a).reduce((final, [key, value]) => {
    if (!final) return final;
    return b[key] === value;
  }, true);
};

// Create global store for mapping functions to their memorizers.
const createFunctionsCache = () => {
  const functions = new Map();

  functions.addMemorizer = (fn, memorizer) => {
    functions.set(fn, memorizer);
  };

  functions.getMemorizer = fn => {
    return functions.get(fn);
  };

  return functions;
};

// Create a cache for results that the function produced
// in the past with the given args.
const createResultsCache = () => {
  const results = new Map();

  results.addResults = (args, result) => {
    results.set(args, result);
  };

  results.getResults = args => {
    return results.get(args);
  };

  return results;
};

// Create a cache for all arguments sets provided to the
// function in the past.
const createArgumentsCache = () => {
  const args = [];

  args.addArgs = newArgs => {
    args.push(newArgs);
  };

  args.matchArgs = newArgs => {
    for (const argSet of args) {
      if (shallowEquals(argSet, newArgs)) {
        return argSet;
      }
    }
  };

  return args;
};

const functions = createFunctionsCache();

const memorize = fn => {
  // If fn has been seen before, use its stored memorizer.
  const cachedMemorizer = functions.getMemorizer(fn);
  if (cachedMemorizer) return cachedMemorizer;

  const resultsCache = createResultsCache();
  const argsCache = createArgumentsCache();

  const memorizer = (...args) => {
    // If these args have been provided before, return the
    // result generated at that time.
    const matchedCacheArgs = argsCache.matchArgs(args);

    if (matchedCacheArgs) {
      return resultsCache.getResults(matchedCacheArgs);
    }

    // Otherwise, generate the result, cache the args and
    // the result, and then return the result.
    const result = fn(...args);

    argsCache.addArgs(args);
    resultsCache.addResults(args, result);

    return result;
  };

  // Associate this fn with this memorizer to be used
  // any time this same function is provided to memorize()
  // in the future.
  functions.addMemorizer(fn, memorizer);
  return memorizer;
};

// EXAMPLE SHIT
const _makeDoubleArray = (a, b) => [a * 2, b * 2];

const main = () => {
  // NOTE: Without memorization, each of the outcomes would be
  // a new array. So a === b would be false.
  const makeDoubleArray = memorize(_makeDoubleArray);
  const a = makeDoubleArray(1, 2);
  const b = makeDoubleArray(1, 2);
  const c = makeDoubleArray(1, 2);
  const d = makeDoubleArray(1, 2);

  console.log(a === b, a === c, b === c, c === d, a === d, b === d);
};

main();
