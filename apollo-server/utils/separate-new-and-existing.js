module.exports = function separateArrIntoNewAndExisting(arr = []) {
  const newItems = arr.filter((x) => !x.id);
  const existingItemIds = arr.filter((x) => x.id).map((x) => x.id);

  return { newItems, existingItemIds };
};
