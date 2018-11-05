import createFunctionsCache from './utilities/createFunctionsCache'
import createArgumentsCache from './utilities/createArgumentsCache'
import createResultsCache from './utilities/createResultsCache'
import createFunctionsCache from './utilities/createFunctionsCache'

const functions = createFunctionsCache();

const memorize = fn => {
  const cachedMemorizer = functions.getMemorizer(fn);
  if (cachedMemorizer) return cachedMemorizer;

  const resultsCache = createResultsCache();
  const argsCache = createArgumentsCache();

  const memorizer = (...args) => {
    const matchedCacheArgs = argsCache.matchArgs(args);

    if (matchedCacheArgs) {
      return resultsCache.getResults(matchedCacheArgs);
    }

    const result = fn(...args);

    argsCache.addArgs(args);
    resultsCache.addResults(args, result);

    return result;
  };

  functions.addMemorizer(fn, memorizer);
  
  return memorizer;
};