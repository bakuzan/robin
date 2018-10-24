const Op = require('sequelize').Op;

const enumArrayToObject = (arr) =>
  arr
    .slice(0)
    .reduce(
      (p, c) =>
        typeof c === 'object' ? { ...p, [c.name]: c.id } : { ...p, [c]: c },
      {}
    );

const mapArrToGraphqlString = (arr) => arr.join(' ');

const separateArrIntoNewAndExisting = (arr) => {
  const newItems = arr.filter((x) => !x.id);
  const existingItemIds = arr.filter((x) => x.id).map((x) => x.id);

  return { newItems, existingItemIds };
};

const castStringToBool = (val) =>
  val === 'true' ? true : val === 'false' ? false : !!val;

const resolveInOp = (b, arr) => (b && arr.length ? Op.in : Op.notIn);

function shuffleArray(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const get = (from, ...selectors) =>
  [...selectors].map((s) =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.') // eslint-disable-line
      .split('.')
      .filter((t) => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      const aVal = get(a, prop)[0];
      const bVal = get(b, prop)[0];
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc' ? [bVal, aVal] : [aVal, bVal];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );

const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

const roundTo2 = (n) => round(n, 2);

const displayAs2dp = (n) =>
  n !== null && n !== undefined ? n.toFixed(2) : null;

module.exports = {
  enumArrayToObject,
  mapArrToGraphqlString,
  separateArrIntoNewAndExisting,
  castStringToBool,
  resolveInOp,
  shuffleArray,
  orderBy,
  round,
  roundTo2,
  displayAs2dp
};
