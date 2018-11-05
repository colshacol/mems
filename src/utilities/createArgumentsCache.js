import shallowEquals from './shallowEquals'

// Create a cache for all arguments sets provided to the
// function in the past.
export default () => {
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