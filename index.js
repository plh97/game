var numberOfWays = function (startPos, endPos, k) {
  if ((Math.abs(endPos - startPos) % 2) !== (k % 2)) {
    return 0;
  }
  const map = {};
  function run(startPos, endPos, k) {
    if (
      map[`${startPos}-${endPos}-${k}`]
    ) {
      return map[`${startPos}-${endPos}-${k}`]
    }
    if (Math.abs(endPos - startPos) === k) {
      return 1
    }
    if (Math.abs(endPos - startPos) > k) {
      return 0
    }
    if (k <= 0) {
      if (startPos === endPos) {
        return 1;
      }
      return 0
    };
    const res = run(startPos + 1, endPos, k - 1)
      + run(startPos - 1, endPos, k - 1)
    map[`${startPos}-${endPos}-${k}`] = res;
    return res;
  }
  return run(startPos, endPos, k);
};
console.log(
  numberOfWays(
    264,
    198,
    68,
  ),
  numberOfWays(
    1,
    1000,
    999,
  ),
  numberOfWays(
    2,
    5,
    10,
  ),
  numberOfWays(
    1,
    2,
    3,
  )
)