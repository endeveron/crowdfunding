const removeDuplicates = (prop, arr1, arr2) => {
  const idSet = new Set(arr1.map((el) => el[prop].toString()));
  return [...arr1, ...arr2.filter((el) => !idSet.has(el[prop].toString()))];
};

const chunkArray = (arr, chunkSize) => {
  const res = [];
  while (arr.length) {
    res.push(arr.splice(0, chunkSize));
  }
  return res;
};

const getRandom = (arr) => arr[~~(Math.random() * arr.length)];

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export { getRandom, chunkArray, removeDuplicates, shuffle };
