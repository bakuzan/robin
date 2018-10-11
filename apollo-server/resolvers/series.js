module.exports = {
  volumes(series, { sort }) {
    const order = sort ? sort.toLowerCase().split('_') : undefined;
    return series
      .getVolumes({ order: [order] })
      .then((volumes) => volumes || []);
  }
};
