const { Retailer } = require('../connectors');

module.exports = {
  volumes(series, { sort }) {
    const order = sort ? { order: [sort.toLowerCase().split('_')] } : {};
    return series
      .getVolumes({ ...order, include: [Retailer] })
      .then((volumes) => volumes || []);
  }
};
