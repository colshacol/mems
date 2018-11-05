# mems

A memoisation utility.

## Usage

A simple example exhibiting how the same exact value is returned
for each invocation of `makeDoubleArray`, although the function
itself would generate a brand new array without memoisation.

```js
import mems from 'mems'

const makeDoubleArray = mems((a, b) => [a * 2, b * 2]);

const main = () => {
  const a = makeDoubleArray(1, 2);
  const b = makeDoubleArray(1, 2);
  const c = makeDoubleArray(1, 2);

  // NOTE: Without memoisation, each of the returned values
  // would be an entirely new array, so the following strict
  // eqality checks would all evaluate to false.
  console.log(a === b, b === c, a === c);
  // true, true, true
};

main();
```

We see here that even when the `main` function is invoked
multiple times, the cached `makeDoubleArray` function/result
persists.

At the end, when we log the size of each of the results Sets,
we see that they are all `1`, because a `Set` will not allow multiple
of the same value to live inside of it, meaning that the second
invocation of `main` resulted in the same values produced by the
first.

```js
import mems from 'mems'

const makeDoubleArray = mems((a, b) => [a * 2, b * 2]);

const aResults = new Set();
const bResults = new Set();
const cResults = new Set();

const main = () => {
  const a = makeDoubleArray(1, 1);
  const b = makeDoubleArray(1, 2);
  const c = makeDoubleArray(1, 3);

  console.log(aResults.has(a), bResults.has(b), cResults.has(c));

  aResults.add(a);
  bResults.add(b);
  cResults.add(c);
};

main();
// false false false

main();
// true true true

console.log(aResults.size, bResults.size, cResults.size);
// 1 1 1
```